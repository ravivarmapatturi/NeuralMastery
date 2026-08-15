---
sidebar_position: 2
---

# LLMs & GenAI — Roadmap

This is where classical deep learning turns into ChatGPT-class systems. Assumes you've covered [Deep Learning](../deep-learning/roadmap.md) first.

## 1. [Foundation Model & Transformer Internals](./foundation-model-internals.md)
- [ ] The full pipeline: text -> tokenizer -> embeddings -> positional encoding -> transformer blocks -> LM head -> logits -> sampling -> token
- [ ] Tokenization: BPE, WordPiece, SentencePiece
- [ ] Embeddings and the embedding table
- [ ] Positional encoding: RoPE and ALiBi
- [ ] KV cache — why it makes autoregressive decoding fast
- [ ] Attention variants: MHA, GQA, MQA, MLA
- [ ] Sparse and sliding-window attention
- [ ] Encoder-only vs decoder-only vs encoder-decoder architectures
- [ ] The MLP block: SwiGLU and gating
- [ ] Mixture of Experts (MoE) — sparse vs dense models
- [ ] Sampling: greedy, temperature, top-k, top-p/nucleus, repetition penalty
- [ ] Context window limits and why they exist

## 2. [Training Pipeline](./training-pipeline.md)
- [ ] Pretraining: next-token prediction at scale
- [ ] The data pipeline: crawl -> clean -> dedupe -> filter -> tokenize -> pack
- [ ] Scaling laws and the Chinchilla compute-optimal result
- [ ] Supervised Fine-Tuning (SFT)
- [ ] RLHF — Reinforcement Learning from Human Feedback
- [ ] Direct Preference Optimization (DPO), IPO, KTO, ORPO, RLOO
- [ ] Group Relative Policy Optimization (GRPO)
- [ ] Parameter-efficient fine-tuning: LoRA, QLoRA, DoRA, adapters, IA3, prefix/prompt tuning
- [ ] Knowledge distillation
- [ ] Quantization (int8, int4, GPTQ, AWQ) for inference

## 3. [Prompt Engineering](./prompt-engineering.md)
- [ ] Zero-shot, one-shot, few-shot prompting
- [ ] Chain-of-Thought and self-consistency
- [ ] ReAct (reasoning + acting) prompting
- [ ] Structured output (JSON/XML) prompting
- [ ] Prompt injection and jailbreaking — attack and defense

## 4. [Retrieval-Augmented Generation (RAG)](./rag.md)
- [ ] RAG architecture: retriever + generator
- [ ] Chunking strategies (fixed, semantic, recursive, parent-child)
- [ ] Embedding model selection
- [ ] Hybrid search (keyword + vector) and re-ranking
- [ ] Query transformation: HyDE, decomposition, step-back prompting
- [ ] GraphRAG
- [ ] Evaluating RAG: faithfulness, relevance, context precision/recall
- [ ] Failure modes: hallucination despite correct context, "lost in the middle," stale knowledge

## 5. [Evaluation](./evaluation-and-serving.md)
- [ ] Perplexity and other intrinsic metrics
- [ ] LLM-as-judge evaluation
- [ ] Benchmark suites (MMLU, HellaSwag, etc.) — what they do and don't tell you
- [ ] Evaluating for hallucination, toxicity, bias

## 6. [Multimodal & Generative Models](./multimodal-generative-models.md)
- [ ] Vision-Language Models (VLMs)
- [ ] Vision-Language-Action models (VLAs)
- [ ] Diffusion models vs autoregressive generation
- [ ] Diffusion Language Models (DLMs)

## 7. [Serving & Production (LLMOps)](./evaluation-and-serving.md#serving--inference-optimization)
- [ ] Inference optimization: batching, speculative decoding, Paged Attention
- [ ] Cost/latency tradeoffs at scale
- [ ] Guardrails and safety filtering in production
