---
sidebar_position: 2
---

# MLOps — Roadmap

Everything between "a model that works in a notebook" and "a model that reliably serves real traffic, gets monitored, and retrains itself." Assumes [Machine Learning](../machine-learning/roadmap.md) and [Deep Learning](../deep-learning/roadmap.md) — this section is about running models in production, not training them.

## 0. Prerequisites
- [ ] Python: OOP, type hints, virtual environments, `pip`/`uv`, `pyproject.toml`, logging, exceptions, `pytest`, async basics
- [ ] Linux: filesystem, processes, permissions, env vars, SSH, bash, `grep`/`awk`/`sed`/`curl`, `systemd`, cron, basic networking
- [ ] Git: branching, merge/rebase, pull requests, hooks, GitHub Actions, semantic versioning

## 1. [Engineering Foundations for ML](./engineering-foundations.md)
- [ ] Clean code, SOLID principles, modular architecture, config/dependency management, API design
- [ ] Unit, integration, end-to-end, regression, data validation, model, API, and load testing
- [ ] `pytest`, `unittest`, `mock`, Locust, Postman

## 2. [Data Engineering & Versioning](./data-engineering-and-versioning.md)
- [ ] The data pipeline: source → ingestion → validation → transformation → storage → feature engineering → training
- [ ] SQL (Postgres/MySQL), Redis, MongoDB basics; Pandas/NumPy/Polars/PySpark
- [ ] Data versioning, lineage, reproducibility — DVC, LakeFS, Delta Lake, Apache Iceberg
- [ ] Data contracts and schema evolution

## 3. [Experiment Tracking](./experiment-tracking.md)
- [ ] What every experiment needs to answer: code, data, model, params, metrics, environment, result
- [ ] MLflow (Tracking, Projects, Models, Model Registry) — the must-know tool
- [ ] Alternatives: Weights & Biases, Neptune, Comet

## 4. [Pipeline Orchestration](./pipeline-orchestration.md)
- [ ] The ML lifecycle as a pipeline: validation → preprocessing → feature engineering → training → evaluation → registry → deployment → monitoring → retraining
- [ ] DAGs, task dependencies, scheduling, retries, caching, backfilling
- [ ] Airflow (DAG/Task/Operator/Scheduler/Executor/Sensor/XCom), Prefect, Dagster

## 5. [Containers](./containers.md)
- [ ] Docker: images, containers, Dockerfile, Compose, volumes, networks, multi-stage builds, image optimization, container security
- [ ] Registries: Docker Hub, ECR, GCP Artifact Registry, Azure Container Registry

## 6. [APIs & Model Serving](./model-serving.md)
- [ ] FastAPI/Flask, REST, auth, validation, serialization, async APIs, versioning, rate limiting
- [ ] Batch, online, and streaming inference architectures
- [ ] Serving tools: FastAPI, MLflow serving, BentoML, TorchServe, NVIDIA Triton, Ray Serve, KServe

## 7. [Cloud Computing for ML](./cloud-computing.md)
- [ ] Pick one cloud and go deep — AWS as the reference: EC2/ECS/EKS/Lambda, S3/EBS, RDS/DynamoDB, SageMaker, VPC/ALB/API Gateway, IAM/Secrets Manager/KMS, ECR
- [ ] GCP equivalents: GCE/GKE/Vertex AI/BigQuery/Cloud Storage
- [ ] Azure equivalents: AKS/Azure ML/Azure OpenAI/Blob Storage
- [ ] Cloud-neutral patterns: why containers/Kubernetes/Terraform keep architecture portable across all three

## 8. [Kubernetes](./kubernetes.md)
- [ ] Fundamentals: Pod, Deployment, Service, Namespace, ConfigMap, Secret, Volume/PV/PVC, Ingress, Job/CronJob
- [ ] Advanced: Helm, StatefulSets, DaemonSets, HPA, resource requests/limits, RBAC, network policies, Operators

## 9. [Infrastructure as Code](./infrastructure-as-code.md)
- [ ] Terraform: providers, resources, variables, outputs, modules, state, remote state, workspaces
- [ ] Immutable infrastructure vs configuration management; Ansible/Pulumi as alternatives

## 10. [CI/CD & ML CI/CD](./cicd-and-ml-cicd.md)
- [ ] CI (test/build/lint/scan) vs CD (deploy/test/production); GitHub Actions + Argo CD
- [ ] Why ML CI/CD needs data + model validation on top of code: drift checks, model regression testing, automated retraining

## 11. [Feature Stores & Model Registry](./feature-stores-and-model-registry.md)
- [ ] Online vs offline features, feature freshness, training-serving skew; Feast
- [ ] Model versions/stages/lineage/promotion workflow; MLflow Model Registry, SageMaker Model Registry

## 12. [Deployment Strategies](./deployment-strategies.md)
- [ ] Blue-Green, Canary (gradual traffic shift), Shadow deployment, A/B testing

## 13. [Monitoring & Drift Detection](./monitoring-and-drift.md)
- [ ] Infrastructure, application, and ML-specific monitoring
- [ ] Data drift math: PSI, KL divergence, JS divergence, KS test, Chi-square, Wasserstein distance
- [ ] Data drift vs concept drift; Evidently, WhyLabs, Arize

## 14. [Observability](./observability.md)
- [ ] The three pillars: structured/centralized logs (ELK/OpenSearch/Loki), metrics (Prometheus/Grafana), traces (OpenTelemetry/Jaeger)

## 15. [GPU/AI Infrastructure & Distributed Training](./gpu-and-distributed-training.md)
- [ ] CUDA, VRAM, CUDA cores vs Tensor cores, GPU utilization, memory bandwidth
- [ ] The CUDA programming model: SMs, warps, blocks, kernels, warp divergence, the memory hierarchy
- [ ] Occupancy, CUDA streams, CUDA graphs
- [ ] Profiling: Nsight Systems, Nsight Compute
- [ ] NVIDIA stack: CUDA, cuDNN, TensorRT, Triton, NCCL
- [ ] Data/model/pipeline/tensor/expert parallelism, FSDP, DeepSpeed, gradient accumulation, mixed precision
- [ ] 3D and 4D parallelism: how the strategies combine at frontier scale
- [ ] Elastic training and fault tolerance: checkpointing, failure recovery, dynamic worker scaling

## 16. [LLM Inference Engines](./llm-inference-engines.md)
- [ ] The inference stack: API gateway → serving framework → inference engine → model runtime → GPU/CUDA
- [ ] Engine vs framework vs platform: inference engine *executes* the model, serving framework *exposes* it as an API, hosting platform *provides* the infrastructure, fine-tuning framework *trains/adapts* it (not the same job as an inference engine)
- [ ] Tier 1: vLLM, SGLang, llama.cpp, TensorRT-LLM, Hugging Face TGI, ONNX Runtime, OpenVINO
- [ ] Tier 2: NVIDIA Triton (general-purpose multi-framework serving, distinct from LLM-specific engines), DeepSpeed-Inference, ExecuTorch, MLX, MLC-LLM, Apache TVM, Ray Serve

## 17. [LLM Inference Optimization](./llm-inference-optimization.md)
- [ ] Quantization: FP32/FP16/BF16/FP8/INT8/INT4, PTQ vs QAT, GPTQ/AWQ/SmoothQuant/BitsAndBytes/HQQ/AQLM
- [ ] GGUF ecosystem: GGML, quantization levels (Q4_K_M, Q5_K_M, Q6_K, Q8_0), model formats (Safetensors/ONNX/TensorRT engine/GGUF/OpenVINO IR)
- [ ] KV cache, Paged Attention, prefix caching, KV cache quantization/sharing
- [ ] Attention variants: MHA vs MQA vs GQA vs MLA, and why they trade KV cache size differently
- [ ] FlashAttention (1/2/3), FlashInfer — IO-aware attention computation
- [ ] Speculative decoding: draft model, target model, acceptance rate
- [ ] Batching: static → dynamic → continuous; tensor/pipeline/data/expert parallelism
- [ ] Prefill vs decode (compute-bound vs memory-bandwidth-bound); TTFT, TPOT, P50/P95/P99 latency, tokens/sec, cost/1M tokens

## 18. [LLM Hosting, Serving Patterns & LLMOps Monitoring](./llm-hosting-and-serving-patterns.md)
- [ ] Cloud GPU hosting (AWS/GCP/Azure, RunPod, Modal, Together AI, Groq, Fireworks, HF Inference Endpoints) — the model→container→GPU VM→inference engine→load balancer→API stack
- [ ] Local hosting: Ollama, LM Studio, llama.cpp server, self-hosted vLLM
- [ ] Fine-tuning → inference handoff: where Unsloth (LoRA/QLoRA training) fits *before* a separate inference runtime (vLLM/llama.cpp/SGLang/TensorRT-LLM/Ollama) — not itself an inference engine
- [ ] Multi-LoRA serving: one base model, many swappable adapters
- [ ] Multimodal/VLM inference (image → vision encoder → projector → LLM) and serving it
- [ ] Embedding & reranker serving for RAG (TEI, vLLM-supported embeddings, Triton, FastAPI)
- [ ] LLMOps monitoring: token usage, cost, hallucination rate — the operational layer on top of the inference metrics above

## 19. [LLM Evaluation & RAGOps](./llm-evaluation-and-ragops.md)
- [ ] Traditional metrics (BLEU/ROUGE/F1) vs LLM-as-judge (faithfulness, relevance, groundedness)
- [ ] Ragas, DeepEval, LangSmith, Arize Phoenix
- [ ] RAG pipeline monitoring: chunk quality, retrieval latency, Recall@K/Precision@K/MRR/NDCG, hallucination

## 20. [Security & Reproducibility](./security-and-reproducibility.md)
- [ ] IAM, secrets management, API auth/RBAC, TLS, container/dependency scanning
- [ ] LLM-specific: prompt injection, data leakage, jailbreaks, excessive agency, PII protection (see [AI Security](../ai-security/roadmap.md) for the full depth)
- [ ] Reproducibility checklist: code, data, model, params, environment, seeds, hardware

## 20.1. [ML & LLM Testing](./ml-and-llm-testing.md)
- [ ] Statistical tests, schema tests, model behavior tests, regression tests
- [ ] LLM-specific: prompt tests, golden datasets, hallucination/jailbreak/tool-call/structured-output tests, agent trajectory tests

## 20.2. [Production Reliability](./production-reliability.md)
- [ ] Retries, timeouts, circuit breakers
- [ ] Fallback models, graceful degradation
- [ ] Rate limits, backpressure, queues
- [ ] Idempotency, distributed locks
- [ ] Disaster recovery, rollback

## 20.3. [AI Cost Engineering](./ai-cost-engineering.md)
- [ ] Training cost, inference cost (cost per 1M tokens)
- [ ] GPU/memory utilization, caching, batching, quantization
- [ ] Model routing, distillation, prompt/context compression
- [ ] The quality vs. latency vs. cost tradeoff

## 20.4. [Legal, Licensing & Governance](./legal-licensing-and-governance.md)
- [ ] Model licenses, dataset licenses, copyright
- [ ] Privacy: PII, GDPR, HIPAA
- [ ] AI governance, model cards, data cards, audit trails

## 21. [The Full MLOps Architecture, Priority Stack & Learning Path](./mlops-architecture-and-roadmap.md)
- [ ] The complete end-to-end architecture, source data to monitored production
- [ ] A prioritized tool stack (don't learn 30 tools at once) and an 8-phase learning order
- [ ] 5 capstone projects, from a production churn model to a full LLM serving platform

See [ML System Design](../ml-system-design/roadmap.md) for the *design* side of production ML systems (the 9-step framework, case studies) — this section is the *operational* side: how those designs actually get built, deployed, and kept running.
