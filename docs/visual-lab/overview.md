---
sidebar_position: 1
---

# Visual Lab — Overview

Every other page on this site explains a concept, and most back that explanation with a generated chart or animation. This section is different: every visualization here is **live** — you set the parameters, you click the canvas, you watch it respond in real time. Reading about gradient descent tells you what should happen; dragging the starting point and watching Adam actually out-turn SGD around a ravine is a different, stronger kind of understanding.

## How to Use This Section

Each page below is one interactive component, with a short "what to try" list. Most are also embedded directly on the content page they belong to (the Gradient Descent Explorer lives on both this page *and* [Optimizers, In Full Depth](../deep-learning/optimizers.md), right where the static version used to be alone) — this section exists so every interactive visualization also has one permanent, browsable home, independent of which content page you started from.

## What's Here So Far

- **[Gradient Descent Explorer](./gradient-descent-explorer.md)** — click to set a starting point on a real loss surface, choose SGD/Momentum/Adam, and watch each one converge (or not) live.
- **[Neural Network Playground](./neural-network-playground.md)** — a real, hand-written neural network training live on a toy dataset you pick, with full control over depth, width, and activation.
- **[Attention Step-Through](./attention-step-through.md)** — type a sentence, watch a real attention heatmap and per-token breakdown compute live, across multiple heads.
- **[RAG Pipeline Simulator](./rag-pipeline-simulator.md)** — a real, clickable retrieval pipeline: chunking, cosine-similarity ranking, and reranking, responding live to whatever you ask.
- **[Agent Execution Graph](./agent-execution-graph.md)** — step through a scripted ReAct loop one Thought/Action/Observation at a time, or watch it play automatically.
- **[LLM Inference Flow Visualizer](./inference-flow-visualizer.md)** — the text-to-token pipeline as a clickable graph, with a real live temperature/top-k/top-p sampling playground.
- **[Decision Boundary Playground](./decision-boundary-playground.md)** — click to place points, pick KNN / decision tree / k-means, and watch a real boundary recompute live.
- **[Embedding Space Explorer](./embedding-space-explorer.md)** — a real from-scratch PCA projection, cosine-similarity nearest neighbors, and the king − man + woman ≈ queen analogy, live.
- **[Linear Regression Studio](./linear-regression-studio.md)** — drag the line yourself, or hand it to real gradient descent and watch it converge (or diverge) on a real dataset, loss surface included.
- **[Logistic Regression Studio](./logistic-regression-studio.md)** — a real sigmoid fit, plus a live side-by-side of cross-entropy vs. the non-convex MSE-on-sigmoid trap, both computed from scratch.
- **[Ridge Regression Studio](./ridge-regression-studio.md)** — a real closed-form ridge solve on a deliberately multicollinear dataset; watch unstable OLS coefficients settle down as λ increases.
- **[Lasso Regression Studio](./lasso-regression-studio.md)** — real coordinate-descent soft-thresholding on the same dataset as Ridge; watch coefficients hit exactly zero instead of just shrinking.

See the [roadmap](./roadmap.md) for what's shipped and what might come next.
