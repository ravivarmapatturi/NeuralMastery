---
sidebar_position: 9
---

# Cloud Computing for ML

Almost nothing in this section runs on a laptop in production — pick one cloud, go deep on it, and treat the others as "the same concepts, different names" once you know one well. AWS is the reference here because it's the most common in job postings, not because it's uniquely correct.

## Compute

- **EC2**: raw virtual machines — the building block everything else is built on top of. GPU instances (the `p`/`g` families) are where model training and self-hosted inference actually run.
- **ECS**: AWS's own container orchestration service — simpler than Kubernetes, a reasonable choice when you don't need Kubernetes's full feature set.
- **EKS**: managed Kubernetes on AWS — see [Kubernetes](./kubernetes.md).
- **Lambda**: serverless functions, billed per invocation — good for lightweight, spiky, stateless workloads (a small preprocessing step, a webhook handler); a poor fit for GPU inference or anything with a long cold-start-sensitive model to load.

## Storage & Databases

- **S3**: object storage — the default place datasets, model artifacts, and logs live; nearly every tool in this section (DVC, MLflow, Airflow, Docker registries) can use S3 as a backend.
- **EBS**: block storage attached to a single EC2 instance — used for a VM's own disk, not for data meant to be shared across services.
- **RDS**: managed relational databases (Postgres/MySQL) — see [Data Engineering & Versioning](./data-engineering-and-versioning.md).
- **DynamoDB**: a managed NoSQL key-value/document store — used where Redis-like low-latency lookups need to be durable and fully managed rather than in-memory.

## ML-Specific: SageMaker

AWS's managed ML platform — training jobs, hyperparameter tuning, a built-in model registry, and managed endpoints for serving, all without provisioning the underlying infrastructure by hand. The tradeoff is the same as any managed platform: faster to get running, but more vendor lock-in and less control than assembling the equivalent from EC2 + Docker + a serving tool from [APIs & Model Serving](./model-serving.md) yourself. Many teams use SageMaker for training (where its managed job infrastructure saves real time) while self-hosting serving on EKS/Triton for more control over latency and cost.

## Networking & Security

- **VPC**: an isolated virtual network — where every resource above actually lives, with subnets controlling what's public vs. private.
- **ALB (Application Load Balancer)**: distributes incoming traffic across multiple instances/containers — sits in front of a serving fleet.
- **API Gateway**: manages, authenticates, and rate-limits API traffic in front of Lambda or other backends — see [the inference stack](./llm-inference-engines.md) for where an API gateway sits in front of LLM serving specifically.
- **IAM**: identity and access management — who (or what service) is allowed to do what; the single most common source of both "why can't my pipeline read this S3 bucket" bugs and real security incidents (over-permissioned roles).
- **Secrets Manager / KMS**: managed secret storage and encryption-key management — where API keys and database credentials belong instead of a config file or a Dockerfile.
- **ECR**: AWS's container registry — see [Containers](./containers.md).

## The Pattern to Internalize

Every cloud maps onto the same shape: compute (VMs, containers, serverless), storage (object, block, database), networking (VPC, load balancer, gateway), and identity (IAM). Learning AWS deeply and then encountering GCP or Azure is mostly a vocabulary-mapping exercise (EC2↔Compute Engine↔Azure VMs, S3↔GCS↔Blob Storage, IAM↔IAM↔Azure AD) rather than learning new concepts from scratch.

Next: [Kubernetes](./kubernetes.md) — the layer that orchestrates containers across a fleet of the compute above.
