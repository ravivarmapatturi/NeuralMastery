---
sidebar_position: 3
---

# The Project Ladder

Six levels, each with a different bar for what "done" means. Pick projects relevant to what you're currently learning elsewhere on this site rather than working the ladder in strict order — the level structure is about scoping effort and rigor appropriately, not a mandatory sequence.

## Level 1 — Tiny Projects (an afternoon each)

Bar: a working, correct implementation of one focused idea, run locally, no deployment. Examples: a linear regression model on a real (not toy) dataset with a proper train/test split; a from-scratch k-means implementation clustering a real dataset; a sentiment classifier using classical ML ([Naive Bayes](../machine-learning/naive-bayes-lda-qda.md) or [Logistic Regression](../machine-learning/logistic-regression.md)) on a text dataset; a simple image classifier fine-tuned on a small custom dataset; a Kaplan-Meier survival curve on a real censored dataset (see [Survival Analysis](../machine-learning/survival-analysis.md)).

## Level 2 — Intermediate Projects (a weekend each)

Bar: a complete pipeline (not just a model) with a genuine baseline comparison and real evaluation metrics. Examples: a full [ML Workflow Fundamentals](../machine-learning/ml-workflow-fundamentals.md)-compliant pipeline with proper cross-validation and hyperparameter tuning on a Kaggle-style competition dataset; a small RAG chatbot over a personal document collection (see [RAG](../llms-genai/rag.md)); a fine-tuned small LLM via LoRA on a specific task (see [Training Pipeline — PEFT](../llms-genai/training-pipeline.md#parameter-efficient-fine-tuning-peft)); an object detector fine-tuned on a custom dataset (see [Vision Tasks & Models](../computer-vision/vision-tasks-and-models.md)); a recommender system on a real ratings dataset using matrix factorization (see [Recommender Systems](../machine-learning/recommender-systems.md)).

## Level 3 — Advanced Projects (one to two weeks each)

Bar: a system combining multiple components, with a documented architecture decision and a real evaluation methodology (see [AI Evaluation](../ai-evaluation/roadmap.md)), not just accuracy. Examples: a multi-agent system with genuine tool use and a supervisor pattern (see [Agent Architectures](../agents/agent-architectures.md)); a GraphRAG pipeline over a real, moderately large document collection; a multimodal VLM-based application (image Q&A, visual search); a time-series forecasting system comparing classical (ARIMA/Prophet) against a neural (TFT) approach on real data (see [Time Series Forecasting](../machine-learning/time-series-forecasting.md)); an anomaly detection system on real streaming/log data with a genuine precision/recall tradeoff analysis.

## Level 4 — Production Systems (real deployment, monitoring, cost tracking)

Bar: actually deployed and reachable (even if only you can reach it), with real monitoring and a documented cost. This is where the full project template from [Projects Overview](./overview.md) starts applying in full, not just its first few fields. Examples: the five capstones already detailed in [The Full MLOps Architecture — Five Capstone Projects](../mlops/mlops-architecture-and-roadmap.md#five-capstone-projects) — a production churn model with canary deployment and drift monitoring, a self-retraining pipeline, a Kubernetes-native serving platform, a self-hosted LLM serving stack with benchmarked TTFT/TPOT/throughput, and a full LLM serving + RAG platform with multi-LoRA serving and Ragas-based evaluation.

## Level 5 — Research Reproductions (reproduce a paper's headline result)

Bar: take a real paper (see [How to Read AI Papers](../research-engineering/how-to-read-ai-papers.md)) and reproduce its central claimed result from the paper's description alone — this is the "reproduce" step from that page's reading structure, actually executed, and it's a genuinely different (and harder) skill than following a tutorial, since papers routinely omit details a tutorial wouldn't. Examples: reproduce a classic architecture's reported benchmark accuracy from scratch (a ResNet variant on CIFAR, a small Transformer's reported perplexity on a standard dataset); reproduce a recent, moderately-scoped paper's ablation study, confirming (or failing to confirm) that the components the paper claims matter actually do when you remove them yourself.

## Level 6 — Frontier Capstones (a genuine portfolio centerpiece)

Bar: a substantial, original system that would genuinely stand out in a portfolio or interview — combining multiple advanced techniques from across this site into something bigger than any single project above, ideally addressing a real problem you personally care about rather than a generic exercise. Examples: a full agentic coding assistant with sandboxed execution and a real evaluation suite (see [Agent Application Patterns](../agents/agent-architectures.md#agent-application-patterns)); a domain-specific foundation model, pretrained or extensively continued-pretrained on a specific domain's data (see [AI for Science — Scientific Foundation Models](../ai-for-science/ai-for-science-fundamentals.md#scientific-foundation-models) for one concrete domain to draw from); a complete, benchmarked comparison of multiple inference engines (vLLM vs. SGLang vs. TensorRT-LLM vs. llama.cpp, see [LLM Inference Engines](../mlops/llm-inference-engines.md)) serving the same model, with your own latency/throughput/cost measurements, not borrowed numbers.

## Choosing What to Build Next

The project ladder isn't meant to be climbed exhaustively — pick the level and topic that's genuinely relevant to what you're currently learning, and let depth of understanding (not level number) be the actual goal. A well-executed Level 2 project you deeply understand beats a poorly-executed Level 5 project you rushed through to check a box.
