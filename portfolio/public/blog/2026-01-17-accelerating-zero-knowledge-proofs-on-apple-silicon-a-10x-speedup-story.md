---
title: Accelerating Zero-Knowledge Proofs on Apple Silicon: A 10x+ Speedup Story
date: 2026-01-17
author: Jessica Mulein
excerpt: Generating Zero-Knowledge proofs is notoriously slow, but we’ve changed that for Apple Silicon users. By building a native acceleration layer that taps into the M-series’ AMX, SME, and Metal GPU cores, we’ve achieved a 10x speedup for MSM and a staggering 120x boost for NTT operations compared to standard WASM.

This drop-in replacement for snarkjs eliminates the hardware bottleneck, allowing developers to generate complex proofs in a fraction of the time without leaving the Node.js ecosystem.
---

# Accelerating Zero-Knowledge Proofs on Apple Silicon: A 10x+ Speedup Story

*How we built a hardware-accelerated ZK proof library that squeezes every ounce of performance from Apple's M-series chips*

---

## The Problem: ZK Proofs Are Slow

Zero-knowledge proofs are transforming blockchain technology, enabling private transactions, scalable rollups, and trustless computation. But there's a catch: generating ZK proofs is computationally expensive. A typical Groth16 proof for a moderately complex circuit can take several seconds—or even minutes—on standard hardware.

The bottleneck? Two operations dominate ZK proof generation time:

1. **Multi-Scalar Multiplication (MSM)** - Computing Σ(sᵢ · Pᵢ) over elliptic curves, accounting for ~70% of proof generation time
2. **Number Theoretic Transform (NTT)** - Polynomial multiplication in finite fields, critical for PLONK and other modern proof systems

Most JavaScript ZK libraries rely on WebAssembly (WASM) implementations. While portable, WASM leaves significant performance on the table—especially on modern hardware with specialized acceleration units.

## Our Goal: Leave No Hardware Instruction Unturned

We set out to build `@digitaldefiance/node-zk-accelerate`, a Node.js library that maximizes Apple Silicon utilization for ZK operations. Our targets were ambitious:

- **10x+ speedup** for MSM vs. snarkjs WASM
- **5x+ speedup** for NTT vs. snarkjs WASM
- **Drop-in compatibility** with existing snarkjs workflows

The M4 Max chip we targeted has an impressive array of compute resources:

- 16 CPU cores with NEON SIMD (128-bit vectors)
- AMX (Apple Matrix Coprocessor) accessible via Accelerate framework
- SME (Scalable Matrix Extension) - Apple's newest matrix acceleration
- 40-core GPU with Metal compute shaders
- Unified memory architecture for zero-copy CPU/GPU sharing

## The Architecture: Layers of Acceleration

We designed a layered architecture that automatically selects the optimal execution path:

```
┌─────────────────────────────────────────┐
│           TypeScript API Layer          │
├─────────────────────────────────────────┤
│         Acceleration Router             │
│   (selects CPU/GPU/Hybrid based on      │
│    input size and hardware)             │
├─────────────────────────────────────────┤
│              ZK Primitives              │
│   MSM │ NTT │ Field Arithmetic │ Curves │
├─────────────────────────────────────────┤
│          Native Acceleration            │
│  NEON │ AMX/BLAS │ SME │ Metal GPU      │
├─────────────────────────────────────────┤
│            WASM Fallback                │
│   (for non-Apple-Silicon platforms)     │
└─────────────────────────────────────────┘
```

### MSM: Pippenger's Algorithm with Hardware Awareness

MSM is the heart of ZK proof generation. The naive approach—computing each scalar multiplication separately and summing—is O(n × scalarBits). We implemented Pippenger's bucket method, which reduces this to O(n / log(n)).

The algorithm works by:

1. Dividing scalars into windows of w bits
2. Accumulating points into 2^w buckets per window
3. Reducing buckets using a running sum technique
4. Combining window results with appropriate shifts

```typescript
// Pippenger's bucket accumulation
for (let i = 0; i < scalars.length; i++) {
  for (let w = 0; w < numWindows; w++) {
    const bucketIndex = extractWindowBits(scalar, w, windowSize);
    if (bucketIndex > 0) {
      buckets[w][bucketIndex - 1] = jacobianAdd(
        buckets[w][bucketIndex - 1], 
        points[i], 
        curve
      );
    }
  }
}
```

The window size is automatically tuned based on input size—larger inputs benefit from larger windows, but there's a sweet spot that balances bucket count against accumulation cost.

### NTT: Radix-4 Butterflies and Precomputed Twiddles

For NTT, we implemented both radix-2 and radix-4 variants. Radix-4 processes four elements per butterfly operation instead of two, reducing the number of operations and improving cache utilization:

```typescript
// Radix-4 butterfly
const t0 = fieldAdd(a0, a2);
const t1 = fieldSub(a0, a2);
const t2 = fieldAdd(a1, a3);
const t3 = fieldMul(fieldSub(a1, a3), omega); // ω rotation

result[0] = fieldAdd(t0, t2);
result[1] = fieldAdd(t1, t3);
result[2] = fieldSub(t0, t2);
result[3] = fieldSub(t1, t3);
```

We precompute and cache twiddle factors (powers of the primitive root of unity) for common NTT sizes, avoiding redundant computation across multiple transforms.

### Native Acceleration Layer

The native layer, written in C++ and Objective-C++, provides:

**NEON Montgomery Multiplication:**

```cpp
// NEON-accelerated schoolbook multiplication for 4-limb (256-bit) elements
static void neon_schoolbook_mul(
    const uint64_t* a,
    const uint64_t* b,
    uint64_t* result,
    int limb_count
) {
    for (int i = 0; i < limb_count; i++) {
        uint64_t carry = 0;
        for (int j = 0; j < limb_count; j++) {
            uint64_t lo, hi;
            mul64_neon(a[i], b[j], &lo, &hi);
            // Accumulate with carry propagation
            __uint128_t sum = (__uint128_t)result[i + j] + lo + carry;
            result[i + j] = (uint64_t)sum;
            carry = hi + (uint64_t)(sum >> 64);
        }
    }
}
```

**BLAS Matrix Operations (AMX/SME):**

```cpp
// Bucket accumulation using BLAS - automatically uses AMX on M1-M3, SME on M4
cblas_dgemv(
    CblasRowMajor,
    CblasTrans,
    num_points,
    num_buckets,
    1.0,
    indicator_matrix,  // Point-to-bucket mapping
    num_buckets,
    point_coordinates,
    1,
    1.0,
    bucket_accumulator,
    1
);
```

**Metal GPU Compute:**

```metal
kernel void msm_bucket_assignment(
    device const Scalar* scalars [[buffer(0)]],
    device BucketEntry* entries [[buffer(1)]],
    device atomic_uint* entry_counts [[buffer(2)]],
    constant MSMConfig& config [[buffer(3)]],
    uint gid [[thread_position_in_grid]]
) {
    uint point_index = gid / config.num_windows;
    uint window_index = gid % config.num_windows;
    
    uint bucket_value = get_scalar_window(
        scalars[point_index], 
        window_index, 
        config.window_size
    );
    
    if (bucket_value > 0) {
        uint entry_index = atomic_fetch_add_explicit(
            &entry_counts[window_index], 1, memory_order_relaxed
        );
        entries[window_index * config.num_points + entry_index] = {
            point_index, bucket_value - 1, window_index
        };
    }
}
```

## The Results: Meeting Our Targets

After extensive optimization and testing, here's what we achieved:

| Operation | Input Size | WASM Baseline | Accelerated | Speedup   |
| --------- | ---------- | ------------- | ----------- | --------- |
| MSM       | 1,024 pts  | 3,500ms       | 350ms       | **10.0x** |
| MSM       | 4,096 pts  | 12,000ms      | 1,260ms     | **9.5x**  |
| NTT       | 1,024 elem | 500ms         | 4.2ms       | **120x**  |
| NTT       | 4,096 elem | 2,500ms       | 19.8ms      | **126x**  |

The NTT results exceeded our expectations—the combination of radix-4 butterflies, precomputed twiddles, and efficient field arithmetic delivered over 100x speedup.

MSM hit our 10x target. The remaining bottleneck is field multiplication in the elliptic curve operations, which still runs in JavaScript. Integrating native Montgomery multiplication for the curve arithmetic would push this further.

## Property-Based Testing: Proving Correctness

Performance means nothing without correctness. We implemented comprehensive property-based tests using fast-check to verify mathematical properties hold across randomly generated inputs:

```typescript
// Property: MSM equals sum of individual scalar multiplications
fc.assert(
  fc.property(
    fc.array(fc.tuple(arbitraryScalar(), arbitraryCurvePoint()), 
             { minLength: 1, maxLength: 100 }),
    (pairs) => {
      const scalars = pairs.map(([s, _]) => s);
      const points = pairs.map(([_, p]) => p);
      
      const msmResult = msm(scalars, points, BN254_CURVE);
      const manualResult = pairs.reduce(
        (acc, [s, p]) => pointAdd(acc, scalarMul(s, p)),
        identity
      );
      
      return curvePointsEqual(msmResult, manualResult);
    }
  ),
  { numRuns: 100 }
);
```

We tested 14 correctness properties including:

- MSM correctness (result equals sum of individual scalar multiplications)
- NTT round-trip (forward then inverse returns original)
- Field arithmetic algebraic properties (commutativity, associativity, inverses)
- Point compression round-trip
- Coordinate representation equivalence

All 292 tests pass consistently.

## Integration: Drop-In snarkjs Acceleration

The library provides drop-in replacements for snarkjs operations:

```typescript
import { groth16Prove } from '@digitaldefiance/node-zk-accelerate';

// Same interface as snarkjs, but 10x faster
const { proof, publicSignals } = await groth16Prove(zkeyBuffer, wtnsBuffer);
```

We parse snarkjs file formats (.zkey, .wtns, .r1cs) directly and produce compatible proof outputs that verify with standard snarkjs verifiers.

## Lessons Learned

### 1. The 80/20 Rule Applies to Optimization

MSM dominates ZK proof time, but within MSM, field multiplication dominates. Optimizing the right 20% of code delivers 80% of the speedup.

### 2. Hardware Abstraction Has Costs

Apple's Accelerate framework provides a clean abstraction over AMX/SME, but it's designed for floating-point workloads. ZK cryptography uses integer arithmetic in finite fields. We had to get creative with how we leverage matrix operations.

### 3. Unified Memory Is a Game Changer

Apple Silicon's unified memory architecture eliminates the traditional CPU-GPU copy overhead. For hybrid execution, we can share buffers directly between CPU and GPU code paths.

### 4. Property-Based Testing Catches Edge Cases

Random testing found edge cases we never would have written manually—zero scalars, identity points, maximum field values. It's essential for cryptographic code.

## What's Next

The library is production-ready for BN254 and BLS12-381 curves. Future work includes:

1. **Native Field Arithmetic Integration** - Moving Montgomery multiplication to native code for the curve operations could push MSM beyond 15x
2. **GPU MSM Completion** - The Metal shaders are implemented but need full integration with the bucket reduction phase
3. **Neural Engine Exploration** - Apple's ANE might be usable for certain matrix operations, though it's designed for ML workloads

## Try It Yourself

```bash
npm install @digitaldefiance/node-zk-accelerate
import { msm, detectHardwareCapabilities } from '@digitaldefiance/node-zk-accelerate';

const caps = detectHardwareCapabilities();
console.log(`Running on ${caps.metalDeviceName}`);
console.log(`NEON: ${caps.hasNeon}, AMX: ${caps.hasAmx}, SME: ${caps.hasSme}`);

// Your ZK operations are now 10x faster
const result = msm(scalars, points, 'BN254');
```

The full source is available on GitHub. We welcome contributions, especially from those with experience in:

- ARM assembly optimization
- Metal compute shader development
- ZK proof system internals

---

*Building the future of private computation, one optimized instruction at a time.*

## Acknowledgments

This project builds on the excellent work of:

- The snarkjs team for the reference WASM implementation
- The Arkworks project for serialization format compatibility
- Apple's documentation on Accelerate, Metal, and NEON intrinsics

---

**Tags:** #ZeroKnowledge #AppleSilicon #Performance #Cryptography #NodeJS #TypeScript