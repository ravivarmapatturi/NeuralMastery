---
sidebar_position: 23
---

# The Full MLOps Architecture, Priority Stack & Learning Path

Every previous page in this section is one piece of a single end-to-end system. This page assembles them, tells you which pieces to learn first, and gives you five projects to actually build it.

## The Complete End-to-End Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  DATA LAYER                                                         │
│  Sources → Ingestion → Validation → Transformation → Storage        │
│  Versioning: DVC / LakeFS / Delta Lake / Iceberg                    │
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  FEATURE LAYER                                                      │
│  Feature Store (Feast): Offline Store ⇄ Online Store                │
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERIMENTATION LAYER                                              │
│  Pipeline Orchestration (Airflow/Prefect/Dagster)                   │
│  Training → Experiment Tracking (MLflow) → Model Registry           │
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  CI/CD LAYER                                                        │
│  Code CI → Model regression tests → Drift gate → Auto-promote       │
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DEPLOYMENT LAYER                                                   │
│  Container → Kubernetes/Cloud → Blue-Green / Canary / Shadow        │
│  Classical: FastAPI/BentoML/Triton  |  LLM: vLLM/SGLang/TensorRT-LLM│
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  SERVING LAYER                                                      │
│  API Gateway → Load Balancer → Inference Engine → GPU/CUDA          │
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│  OBSERVABILITY LAYER                                                │
│  Logs / Metrics / Traces (Prometheus, Grafana, OpenTelemetry)       │
│  Drift Detection (PSI/KL/JS/KS) — LLM Eval (Ragas/DeepEval)         │
└───────────────────────────────┬───────────────────────────────────┘
                                 ▼
                    feeds back into DATA LAYER
                 (retraining trigger on drift/decay)
```

Every arrow is a page you've already read: Data Layer is [Data Engineering & Versioning](./data-engineering-and-versioning.md); Feature Layer is [Feature Stores & Model Registry](./feature-stores-and-model-registry.md); Experimentation is [Experiment Tracking](./experiment-tracking.md) + [Pipeline Orchestration](./pipeline-orchestration.md); CI/CD is [CI/CD & ML CI/CD](./cicd-and-ml-cicd.md); Deployment is [Containers](./containers.md) + [Kubernetes](./kubernetes.md) + [Deployment Strategies](./deployment-strategies.md); Serving is [APIs & Model Serving](./model-serving.md) and, for LLMs, [LLM Inference Engines](./llm-inference-engines.md) through [LLM Hosting & Serving Patterns](./llm-hosting-and-serving-patterns.md); Observability is [Observability](./observability.md) + [Monitoring & Drift Detection](./monitoring-and-drift.md) + [LLM Evaluation & RAGOps](./llm-evaluation-and-ragops.md). [Security & Reproducibility](./security-and-reproducibility.md) and [Engineering Foundations](./engineering-foundations.md) apply across every layer, not one box. [GPU/AI Infrastructure & Distributed Training](./gpu-and-distributed-training.md) underlies the Experimentation and Serving layers wherever GPUs are involved.

## The Priority Stack

Don't learn 30 tools at once. This is the order that maximizes what you can actually build at each stage:

| Priority | Category | Learn first |
|---|---|---|
| 1 (essential) | Engineering foundations | Git, testing, clean code, config management |
| 1 (essential) | Data | SQL, Pandas, one versioning tool (DVC) |
| 1 (essential) | Experiment tracking | MLflow |
| 1 (essential) | Containers | Docker |
| 2 (core) | Serving | FastAPI + one dedicated tool (BentoML or TorchServe) |
| 2 (core) | Orchestration | Airflow |
| 2 (core) | CI/CD | GitHub Actions |
| 2 (core) | Cloud | One cloud, deeply (AWS) |
| 3 (scaling) | Kubernetes | Core objects, then Helm |
| 3 (scaling) | IaC | Terraform |
| 3 (scaling) | Monitoring | Prometheus + Grafana, then Evidently for drift |
| 4 (specialized) | LLM inference | vLLM first, then llama.cpp for local/edge |
| 4 (specialized) | RAGOps | Ragas + a vector database (see [Databases](../databases/roadmap.md)) |
| 5 (advanced) | Distributed training | FSDP/DeepSpeed, multi-GPU parallelism |
| 5 (advanced) | Feature stores | Feast |
| 5 (advanced) | LLM optimization internals | Quantization, PagedAttention, speculative decoding |

## An 8-Phase Learning Order

1. **Foundations**: Python engineering practices, Git, Docker, SQL.
2. **Data**: build one real, versioned data pipeline end to end.
3. **Experimentation**: train a model with MLflow tracking every run.
4. **Serving v1**: wrap that model in a FastAPI endpoint, containerize it.
5. **Automation**: orchestrate the pipeline with Airflow, gate deployment with CI/CD.
6. **Scale**: deploy to Kubernetes, add Terraform-managed infrastructure, add real monitoring and drift detection.
7. **LLM serving**: stand up vLLM, understand the inference stack, build a RAG pipeline with evaluation.
8. **Production hardening**: security review, reproducibility audit, blue-green/canary rollout for a real change.

## Five Capstone Projects

1. **A production churn model**: full pipeline from raw customer data → versioned dataset → tracked training runs → registered model → FastAPI serving → canary deployment → drift monitoring dashboard. Covers the classical-ML half of this section end to end.
2. **A self-retraining pipeline**: an Airflow DAG that checks for drift on a schedule, retrains automatically when drift crosses a threshold, runs the new model through automated regression tests, and only promotes it on a pass — the CI/CD-for-ML loop, actually running.
3. **A Kubernetes-native serving platform**: containerized model, deployed via Helm to a Kubernetes cluster provisioned with Terraform, autoscaling under load, with Prometheus/Grafana dashboards and alerting.
4. **A self-hosted LLM serving stack**: deploy an open-weight model with vLLM, expose it through an OpenAI-compatible API behind a gateway, benchmark TTFT/TPOT/throughput at different batch sizes and quantization levels, and compare against a llama.cpp/GGUF deployment on CPU.
5. **A full LLM serving + RAG platform**: fine-tune a small model's adapter with a LoRA framework, serve it with multi-LoRA support on vLLM alongside the base model, build a RAG pipeline with an embedding model + reranker, and monitor the whole thing with Ragas-based faithfulness scoring and RAG-specific retrieval metrics — the complete arc from [Engineering Foundations](./engineering-foundations.md) to [LLM Evaluation & RAGOps](./llm-evaluation-and-ragops.md) in one project.

See [ML System Design](../ml-system-design/roadmap.md) for how to reason about *designing* a system like the above before building it, and [Interview Prep](../interview-prep/roadmap.md) for how this section maps onto MLOps/infra interview questions.
