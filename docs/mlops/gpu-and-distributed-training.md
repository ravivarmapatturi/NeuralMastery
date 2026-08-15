---
sidebar_position: 17
---

# GPU/AI Infrastructure & Distributed Training

Modern deep learning is bottlenecked by hardware in specific, learnable ways — knowing *why* a training job is slow (compute-bound? memory-bound? communication-bound?) is what separates "add more GPUs and hope" from actually fixing it.

## GPU Fundamentals

- **CUDA**: NVIDIA's parallel computing platform/API — the layer that lets frameworks like PyTorch dispatch computation onto the GPU at all.
- **VRAM**: the GPU's own memory — holds the model weights, activations, gradients, and optimizer state during training; running out of it (`CUDA out of memory`) is the single most common training-infrastructure error.
- **CUDA cores vs. Tensor cores**: CUDA cores are general-purpose parallel compute units; Tensor cores are specialized units for the exact matrix-multiply-accumulate operations that dominate deep learning, and are dramatically faster for that specific workload — mixed-precision training exists largely to make full use of them.
- **GPU utilization**: what fraction of the GPU's compute is actually busy — a training job with low utilization is spending time somewhere else (usually waiting on data loading or memory transfers), and more GPUs won't fix that.
- **Memory bandwidth**: how fast data moves between VRAM and the compute cores — for LLM inference specifically, this (not raw compute) is often the actual bottleneck (see [LLM Inference Optimization](./llm-inference-optimization.md)'s prefill-vs-decode discussion).

## The NVIDIA Stack

- **CUDA**: the base compute platform (above).
- **cuDNN**: NVIDIA's library of hand-optimized primitives (convolutions, RNN cells, attention) that deep learning frameworks call into rather than reimplementing themselves.
- **TensorRT**: NVIDIA's inference optimizer/runtime — takes a trained model and compiles it into a highly optimized engine for a specific GPU (kernel fusion, precision calibration) — see [LLM Inference Engines](./llm-inference-engines.md).
- **Triton**: NVIDIA's general-purpose inference server (unrelated to OpenAI's Triton compiler, confusingly) — see [APIs & Model Serving](./model-serving.md).
- **NCCL (NVIDIA Collective Communications Library)**: optimized multi-GPU/multi-node communication primitives (all-reduce, broadcast) — the layer distributed training actually runs its gradient synchronization over.

## Parallelism Strategies

- **Data parallelism**: the same full model is replicated on every GPU, each processes a different data shard, and gradients are synchronized (all-reduced) across replicas after each step — the simplest form of scaling, limited by needing the full model to fit on one GPU.
- **Model parallelism**: the model itself is split across GPUs (different layers, or different parts of a layer, on different devices) — necessary once a model no longer fits on a single GPU's VRAM.
- **Pipeline parallelism**: a form of model parallelism where different GPUs hold different *stages* (groups of layers) of the model, and micro-batches flow through the pipeline — increases throughput but introduces "bubble" idle time unless carefully scheduled.
- **Tensor parallelism**: a finer-grained form of model parallelism, splitting individual large matrix operations (a single layer's weight matrix) across multiple GPUs — the standard approach for very large individual layers, common in both training and LLM inference (see [LLM Inference Optimization](./llm-inference-optimization.md)).
- **FSDP (Fully Sharded Data Parallel)**: PyTorch's approach to sharding not just data but the model's parameters, gradients, and optimizer state across GPUs, gathering only what's needed for each computation on the fly — dramatically reduces per-GPU memory vs. plain data parallelism, at the cost of extra communication.
- **DeepSpeed**: Microsoft's training optimization library, built around **ZeRO** (Zero Redundancy Optimizer) — a family of stages (ZeRO-1/2/3) that progressively shard optimizer state, gradients, and parameters across GPUs, conceptually similar to FSDP and often mentioned alongside it.

## Training Efficiency Techniques

- **Gradient accumulation**: simulate a larger batch size than fits in VRAM by accumulating gradients over several forward/backward passes before applying an optimizer step — trades wall-clock time for memory.
- **Mixed precision training**: compute most operations in FP16/BF16 (faster, half the memory) while keeping a master copy of weights and certain sensitive operations in FP32 — the standard way to make full use of Tensor cores without sacrificing training stability.

Next: [LLM Inference Engines](./llm-inference-engines.md) — everything above trains a model; the next several pages cover the equally deep, equally hardware-bound problem of serving one efficiently.
