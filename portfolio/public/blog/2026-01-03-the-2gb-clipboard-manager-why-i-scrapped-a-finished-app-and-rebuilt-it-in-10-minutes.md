---
title: The 2GB Clipboard Manager: Why I Scrapped a "Finished" App and Rebuilt It in 10 Minutes
date: 2026-01-03
author: Jessica Mulein
excerpt: I spent hours building a "slim" clipboard app in Python, only to end up with a 2.1GB installer because of framework bloat. I scrapped the whole thing, let AI rewrite it in Swift in just 10 minutes, and ended up with a cleaner, native app that’s only 1MB. Sometimes the best way to "fix" your code is to switch the foundation.
---

# The 2GB Clipboard Manager: Why I Scrapped a "Finished" App and Rebuilt It in 10 Minutes

I recently hit a developer’s rock bottom.

I had just finished a macOS clipboard manager—my own version of **Win+V**. It was feature-complete, the logic was solid, and the UI was exactly where I wanted it. I had used AI to help me sprint through the Python and PyQt code.

But when I went to bundle it for the App Store, the final DMG came out to **over 2GB.**

## The Python Packaging Tax

I hadn't used any heavy AI models or massive data libraries. It was a "slim" app. But to make a Python script run as a native Mac app, you have to pack the entire suitcase: the Python interpreter, the heavy C++ binaries for Qt, and a web of support frameworks.

I stood there looking at a 2.1GB installer for an app that basically just stores text strings. I realized that **nobody—not even me—wants a clipboard manager that takes up more space than a high-definition movie.**

## The 10-Minute Pivot

Instead of trying to "slim down" an inherently heavy foundation, I did something radical. I threw the entire Python project in the trash.

I didn't "port" the code. I didn't try to learn Swift syntax line-by-line. Instead, I took my original requirements document, handed it back to the AI, and said:

> *"We’re starting over. Forget Python. Write this exact app in Swift and SwiftUI. Keep it native, keep it light, and use Apple's built-in APIs."*

**Ten minutes later, I had a working Swift prototype.**

## From Behemoth to Butterfly

Because the AI already understood the "soul" of the app from our work in Python, it generated the Swift version with incredible accuracy. I spent the next few hours "dialing it in"—tweaking the UI padding, fixing a few state management bugs, and navigating the App Store release hurdles.

The results were honestly embarrassing for my original Python version:

| **Metric**           | **Python + PyQt (The Fail)**  | **Swift + SwiftUI (The Win)**           |
| -------------------- | ----------------------------- | --------------------------------------- |
| **Installer Size**   | **2,100 MB**                  | **1 MB**                                |
| **Development Time** | Hours of "fighting" frameworks | **10 minutes** (plus 2 hours of polish) |
| **RAM Usage**        | ~200 MB                       | **14 MB**                               |
| **UX**               | "Close enough" to Mac         | **Native and seamless**                 |

## The Moral: AI is a Universal Translator

The lesson here isn't just "Python is heavy." The lesson is that **language loyalty is a trap.** In the past, scrapping a project meant weeks of retraining and manual rewriting. Today, if you realize you’ve built your house on the wrong foundation, you can move the entire structure in an afternoon.

The AI allowed me to pivot from a "useless" 2GB behemoth to a professional, 1MB native app in less time than it took to download the original's dependencies. Don't be afraid to scrap your "finished" work if the foundation is wrong. The rewrite might only take ten minutes.
