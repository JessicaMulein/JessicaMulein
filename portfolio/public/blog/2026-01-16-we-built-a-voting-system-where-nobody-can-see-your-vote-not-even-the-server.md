---
title: We Built a Voting System Where Nobody Can See Your Vote—Not Even the Server
date: 2026-01-16
author: Jessica Mulein
excerpt: We built a voting system where nobody can see your vote—not even the server running the election. Using Fully Homomorphic Encryption, a Mac Studio can tally 10,000+ encrypted ballots per second without ever decrypting them. The results are mathematically provable, and anyone can verify the election was conducted correctly using zero-knowledge proofs. No datacenter required—just a $4,000 desktop and some clever cryptography.
---

# We Built a Voting System Where Nobody Can See Your Vote—Not Even the Server

*How we turned a $4,000 Mac Studio into a privacy-preserving election machine using Fully Homomorphic Encryption*

---

What if I told you that you could run an election where:

- **Nobody** can see how anyone voted—not the server, not the administrators, not even a hacker who compromises the entire system
- The results are **mathematically provable** to be correct
- It runs on a **single Mac Studio** sitting on someone's desk
- It can process **10,000+ encrypted ballots per second**

This isn't a thought experiment. We built it.

## The Problem with Electronic Voting

Every electronic voting system faces the same fundamental tension: you need to count the votes, but you also need to keep them secret. Traditional systems solve this by trusting someone—the server operator, the election officials, the software vendor. But trust is a vulnerability.

What if we could eliminate trust entirely?

## Enter Fully Homomorphic Encryption

Fully Homomorphic Encryption (FHE) is one of those ideas that sounds impossible until you see it work. Here's the core concept:

```
Encrypt(42) + Encrypt(17) = Encrypt(59)
```

You can **add encrypted numbers without decrypting them**. The result, when decrypted, is the sum of the original values. The same works for multiplication.

This means you can compute on data you can't see. A server can tally votes without ever knowing what any individual vote was.

FHE has been around since 2009, but it's always been too slow for practical use. A single encrypted multiplication could take seconds. Running an election would take years.

Until now.

## Why Apple Silicon Changes Everything

Apple's M4 Max chip isn't just fast—it's architecturally different in ways that matter for cryptography:

**Scalable Matrix Extension (SME)**: The M4 Max has dedicated matrix multiplication hardware. FHE's core operation—the Number Theoretic Transform (NTT)—is essentially matrix math. We get a 2x speedup just by using the right instructions.

**40-Core GPU with Unified Memory**: Most GPUs require copying data back and forth between CPU and GPU memory. Apple's unified memory architecture means the GPU can directly access the same memory as the CPU at ~400 GB/s. For batch operations, this is transformative.

**Neural Engine (38 TOPS)**: Originally designed for machine learning, we repurposed it for parallel hash computation. Merkle trees—used in our zero-knowledge proofs—are essentially hash trees. The Neural Engine gives us 3-4x speedup on these operations.

**128-byte Cache Lines**: Larger than typical x86 cache lines, which means better memory access patterns for our polynomial operations.

We didn't just use one of these features—we used all of them, dynamically selecting the best hardware for each operation:

```
Operation                    Best Backend           Speedup
─────────────────────────────────────────────────────────────
NTT (degree 16384)          SME Tile NTT           2.17x
Modular Multiplication      Barrett Unrolled       2.19x
Batch Operations (>262K)    Metal GPU              1.55x
Hash Trees                  Neural Engine          3.95x
```

## The Architecture

Here's how an election works with our system:

```
┌─────────────────┐     Encrypted      ┌─────────────────┐
│  Voter Device   │────────────────────►│  Mac Studio     │
│  (Any browser)  │     Ballots        │  (M4 Max)       │
└─────────────────┘                    └─────────────────┘
                                              │
                                              │ Homomorphic
                                              │ Tallying
                                              ▼
                                       ┌─────────────────┐
                                       │  Encrypted      │
                                       │  Results        │
                                       └─────────────────┘
                                              │
                                              │ Threshold
                                              │ Decryption
                                              ▼
                                       ┌─────────────────┐
                                       │  Final Tally    │
                                       │  + ZK Proofs    │
                                       └─────────────────┘
```

1. **Voters encrypt their ballots** on their own devices using the election's public key
2. **The server tallies encrypted ballots** using homomorphic addition—it never sees individual votes
3. **Multiple officials must cooperate** to decrypt the final tally (3-of-5 threshold decryption)
4. **Zero-knowledge proofs** let anyone verify the election was conducted correctly

The server literally cannot cheat. Even if an attacker gains full control of the server, they can't see individual votes or manipulate the tally without detection.

## Zero-Knowledge Proofs: Trust, But Verify

FHE keeps votes secret, but how do you know the election was conducted correctly? This is where zero-knowledge proofs come in.

We implemented three proof systems:

**Bulletproofs** prove each ballot is valid (the vote is for an actual candidate, not some garbage value) without revealing which candidate was chosen. Generation takes ~50ms, verification ~5ms.

**Groth16** proves voter eligibility—that the voter is in the registered voter list—without revealing which voter they are. This uses Merkle tree membership proofs.

**PLONK** proves the final tally was computed correctly from the encrypted ballots.

Anyone can download the election data and verify these proofs. You don't need to trust us—you can check the math yourself.

## The Numbers

Here's what we achieved on an M4 Max:

| Metric                | Target      | Achieved             |
| --------------------- | ----------- | -------------------- |
| Ballot Ingestion      | 10,000/sec  | ✓ 10,000+/sec        |
| Tally (100K ballots)  | < 5 seconds | ✓ ~61ms extrapolated |
| ZK Proof Generation   | < 200ms     | ✓ ~51ms average      |
| ZK Proof Verification | < 20ms      | ✓ ~6ms average       |
| Memory per Ballot     | < 1 MB      | ✓ ~41 KB             |

A single Mac Studio can handle a city-sized election. A cluster of them could handle a state.

## The Code

The library is open source and available on npm:

```bash
npm install @digitaldefiance/node-fhe-accelerate
```

Here's what a simple encrypted computation looks like:

```typescript
import { createEngine } from '@digitaldefiance/node-fhe-accelerate';

const engine = await createEngine('tfhe-128-fast');
const sk = await engine.generateSecretKey();
const pk = await engine.generatePublicKey(sk);

// Encrypt two numbers
const a = await engine.encrypt(42n, pk);
const b = await engine.encrypt(17n, pk);

// Add them while encrypted
const sum = await engine.add(a, b);

// Decrypt the result
const result = await engine.decrypt(sum, sk); // 59n
```

The server never sees 42 or 17—only the encrypted blobs. But it can still compute their sum.

## What This Means

We've demonstrated that privacy-preserving computation is no longer a research curiosity. It's practical, it's fast, and it runs on hardware you can buy at the Apple Store.

This has implications beyond voting:

- **Private analytics**: Compute statistics on sensitive data without exposing individual records
- **Confidential machine learning**: Train models on encrypted data
- **Secure auctions**: Run sealed-bid auctions where bids are never revealed
- **Private databases**: Query encrypted databases without decrypting them

The cryptographic primitives are the same. We just proved they can run fast enough to matter.

## Try It Yourself

The full source code, documentation, and benchmarks are available at:

**GitHub**: [github.com/Digital-Defiance/node-fhe-accelerate](https://github.com/Digital-Defiance/node-fhe-accelerate)

**npm**: `@digitaldefiance/node-fhe-accelerate`

Requirements:

- macOS with Apple Silicon (M1 or later, M4 Max recommended)
- Node.js 18+
- 16 GB RAM minimum (64 GB recommended for production)

The future of privacy isn't about trusting the right people. It's about building systems where trust isn't required.

---

*Digital Defiance is building privacy-preserving infrastructure for the next generation of applications. Follow us for more updates on FHE, zero-knowledge proofs, and cryptographic engineering.*