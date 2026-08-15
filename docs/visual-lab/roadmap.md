---
sidebar_position: 2
---

# Visual Lab — Roadmap

## Shipped
- [x] [Gradient Descent Explorer](./gradient-descent-explorer.md) — SGD / Momentum / Adam on a live, clickable loss surface
- [x] [Neural Network Playground](./neural-network-playground.md) — configurable toy-dataset classifier, trained live in-browser
- [x] [Attention Step-Through](./attention-step-through.md) — live QKV/softmax attention heatmap and per-token breakdown, multi-head
- [x] [RAG Pipeline Simulator](./rag-pipeline-simulator.md) — adjustable chunking/top-k/reranking, live retrieved-chunk results
- [x] [Agent Execution Graph](./agent-execution-graph.md) — step through a scripted, clickable ReAct loop trace
- [x] [LLM Inference Flow Visualizer](./inference-flow-visualizer.md) — clickable tokenizer-to-sampling pipeline with a real live sampling playground
- [x] [Decision Boundary Playground](./decision-boundary-playground.md) — click-to-add-points KNN / decision tree / k-means explorer
- [x] [Embedding Space Explorer](./embedding-space-explorer.md) — real from-scratch PCA projection, cosine-similarity nearest neighbors, and word-vector analogy, live
- [x] [Linear Regression Studio](./linear-regression-studio.md) — drag-the-line fitting, MSE/outlier experiment, and a real gradient descent lab with a live loss surface, on a real dataset
- [x] [Logistic Regression Studio](./logistic-regression-studio.md) — real sigmoid fitting plus a live cross-entropy vs. MSE-on-sigmoid convexity comparison
- [x] [Ridge Regression Studio](./ridge-regression-studio.md) — real closed-form ridge solve on a multicollinear dataset, live regularization path
- [x] [Lasso Regression Studio](./lasso-regression-studio.md) — real coordinate-descent soft-thresholding on the same dataset as Ridge, directly comparable regularization path
- [x] `PredictFirst` widget — predict-then-reveal questions wired into all four Studios so far

## Planned, in order
Nothing queued right now. Future additions will follow the same batch-by-batch, build-verified discipline as everything else on this site — the next candidates are Decision Trees and SVM, which need a genuinely different (non-gradient-descent) visualization approach than the regression Studios so far.
