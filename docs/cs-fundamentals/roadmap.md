---
sidebar_position: 2
---

# CS Fundamentals for AI Engineers — Roadmap

## 1. [Operating Systems & Concurrency](./operating-systems-and-concurrency.md)
- [ ] Processes vs. threads, the process/thread memory model
- [ ] Concurrency vs. parallelism — the distinction that matters for Python specifically
- [ ] The GIL, multiprocessing vs. multithreading for ML workloads
- [ ] Memory: stack vs. heap, virtual memory, paging
- [ ] CPU caches (L1/L2/L3) and cache-friendly data access
- [ ] File systems and I/O basics

## 2. [Networking & Distributed Systems](./networking-and-distributed-systems.md)
- [ ] HTTP request/response, status codes, REST basics
- [ ] TCP/IP vs. UDP, sockets, latency vs. bandwidth
- [ ] DNS resolution
- [ ] Load balancing strategies
- [ ] CAP theorem, consensus (Raft/Paxos intuition)
- [ ] Why distributed training and distributed serving are genuinely hard: partial failure, network partitions, stragglers

## 3. [Linux, Git & Developer Tooling](./linux-git-and-tooling.md)
- [ ] The shell: pipes, redirection, `grep`/`awk`/`sed`, process management
- [ ] The Linux filesystem and permissions model
- [ ] Git internals: objects, commits, trees, blobs — not just commands
- [ ] Compilers vs. interpreters, what "compiled" actually means for Python/PyTorch

## 4. [Software Engineering Practice](./software-engineering-practices.md)
- [ ] Design patterns relevant to ML systems (not a full GoF tour)
- [ ] Testing philosophy: what to test, what not to test
- [ ] Profiling: CPU profiling, memory profiling, finding the actual bottleneck
- [ ] Debugging methodology: bisection, reproducing, isolating

Next: [Mathematics for AI](../mathematics-for-ai/roadmap.md) — the math this systems layer runs.
