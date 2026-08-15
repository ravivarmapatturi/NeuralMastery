---
sidebar_position: 1
---

# Python Engineering for AI — Overview

Almost everyone arrives at ML already knowing Python syntax. That's not the same as knowing Python *engineering* — the language features, concurrency model, and tooling that determine whether code is a one-off notebook cell or something a team can run in production for years.

The path this section assumes, and the one worth following in practice:

```
Python (this section)
   ↓
NumPy (vectorized array computation)
   ↓
PyTorch (the same vectorized-computation idea, with autograd and a GPU backend)
   ↓
production Python (packaging, testing, serving — see MLOps)
```

Each layer reuses the one below it — PyTorch's tensor API deliberately mirrors NumPy's, and NumPy's vectorization habit of "avoid the Python `for` loop, reach for the array operation" is the single most important performance instinct in this entire stack, explained precisely in [CS Fundamentals](../cs-fundamentals/operating-systems-and-concurrency.md#cpu-caches) and revisited here from the language side.

## What's in this section

- **[Language Fundamentals: OOP, Functional & Modern Python](./language-fundamentals-and-oop.md)** — classes and OOP done properly, functional-style Python, iterators/generators, decorators, context managers, type hints, dataclasses.
- **[Concurrency, Memory & Performance](./concurrency-memory-and-performance.md)** — `async`/`await`, multiprocessing vs. threading in practice, CPython's memory management (reference counting and the cyclic garbage collector), and where Python performance actually goes.
- **[Packaging, Testing & Tooling](./packaging-testing-and-tooling.md)** — `pyproject.toml`, virtual environments, `pytest` in practice, logging, and the debugger.

See the [roadmap](./roadmap.md) for the full ordered path, and [Engineering Foundations for ML](../mlops/engineering-foundations.md) for how these Python-language skills combine with the broader ML-specific testing taxonomy and clean-architecture practices once code is headed to production.
