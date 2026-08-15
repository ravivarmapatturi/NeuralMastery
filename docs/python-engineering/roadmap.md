---
sidebar_position: 2
---

# Python Engineering for AI — Roadmap

## 1. [Language Fundamentals: OOP, Functional & Modern Python](./language-fundamentals-and-oop.md)
- [ ] OOP: classes, inheritance, composition, magic methods
- [ ] Functional programming in Python: `map`/`filter`/`reduce`, pure functions, immutability
- [ ] Iterators and generators, `yield`, lazy evaluation
- [ ] Decorators: how they work, writing your own
- [ ] Context managers: `with`, `__enter__`/`__exit__`, `contextlib`
- [ ] Type hints, `typing`, static type checking with `mypy`
- [ ] `dataclasses`

## 2. [Concurrency, Memory & Performance](./concurrency-memory-and-performance.md)
- [ ] `async`/`await`, the event loop, when async actually helps
- [ ] `multiprocessing` vs. `threading` in practice (see the GIL in [CS Fundamentals](../cs-fundamentals/operating-systems-and-concurrency.md))
- [ ] Reference counting and the cyclic garbage collector
- [ ] Profiling Python code: `cProfile`, `py-spy`, `memory_profiler`
- [ ] Performance optimization: vectorization over loops, avoiding unnecessary copies

## 3. [Packaging, Testing & Tooling](./packaging-testing-and-tooling.md)
- [ ] `pyproject.toml`, dependency pinning, lockfiles
- [ ] Virtual environments: `venv`, `uv`, why isolation matters
- [ ] `pytest`: fixtures, parametrization, marks, `conftest.py`
- [ ] Logging: the `logging` module vs. `print`
- [ ] Debugging: `pdb`, breakpoints, post-mortem debugging

Next: [Mathematics for AI](../mathematics-for-ai/roadmap.md) — the math this engineering foundation runs.
