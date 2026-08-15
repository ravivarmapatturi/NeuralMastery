---
sidebar_position: 1
---

# MLOps Overview

[Machine Learning](../machine-learning/roadmap.md) and [Deep Learning](../deep-learning/roadmap.md) teach you how to build a model. MLOps is everything required to take that model — currently working in a notebook, on your laptop, on a train/test split that never changes — and turn it into a system that reliably serves real traffic, gets monitored, and retrains itself when the world shifts underneath it.

By the end of this section you should be able to answer, concretely, not abstractly:

- How do I make this reproducible — code, data, model, and environment all versioned together?
- How do I package it, deploy it, and roll it back safely if it's wrong?
- How do I scale it, and how do I know when it's silently degrading?
- How do I serve an LLM efficiently on GPUs, and evaluate a RAG system once it's live?

## Path through this section

- **Foundations**: [Engineering for ML](./engineering-foundations.md), [Data Engineering & Versioning](./data-engineering-and-versioning.md)
- **The core loop**: [Experiment Tracking](./experiment-tracking.md), [Pipeline Orchestration](./pipeline-orchestration.md)
- **Packaging & serving**: [Containers](./containers.md), [APIs & Model Serving](./model-serving.md)
- **Infrastructure**: [Cloud Computing](./cloud-computing.md), [Kubernetes](./kubernetes.md), [Infrastructure as Code](./infrastructure-as-code.md)
- **Automation**: [CI/CD & ML CI/CD](./cicd-and-ml-cicd.md)
- **Production ML plumbing**: [Feature Stores & Model Registry](./feature-stores-and-model-registry.md), [Deployment Strategies](./deployment-strategies.md)
- **Keeping it healthy**: [Monitoring & Drift Detection](./monitoring-and-drift.md), [Observability](./observability.md)
- **At scale**: [GPU/AI Infrastructure & Distributed Training](./gpu-and-distributed-training.md)
- **For GenAI specifically**: [LLM Inference Engines](./llm-inference-engines.md), [LLM Inference Optimization](./llm-inference-optimization.md), [LLM Hosting & Serving Patterns](./llm-hosting-and-serving-patterns.md), [LLM Evaluation & RAGOps](./llm-evaluation-and-ragops.md)
- **Non-negotiables**: [Security & Reproducibility](./security-and-reproducibility.md)
- **Pulling it together**: [The Full Architecture, Priority Stack & Learning Path](./mlops-architecture-and-roadmap.md)

See the [roadmap](./roadmap.md) for the complete checklist, or jump straight to [the priority stack](./mlops-architecture-and-roadmap.md#the-priority-stack) if you want the short version of what actually matters first.
