---
sidebar_position: 2
---

# LLMs & GenAI — Roadmap

This is where classical deep learning turns into ChatGPT-class systems. Assumes you've covered [Deep Learning](../deep-learning/roadmap.md) first.

## 1. Foundation Model & Transformer Internals
- [ ] Tokenization: BPE, WordPiece, SentencePiece
- [ ] Embeddings and the embedding table
- [ ] KV cache — why it makes autoregressive decoding fast
- [ ] Encoder-only vs decoder-only vs encoder-decoder architectures
- [ ] Mixture of Experts (MoE) — sparse vs dense models
- [ ] Grouped-Query Attention (GQA) vs Multi-Head Attention
- [ ] Context window limits and why they exist

## 2. Training Pipeline
- [ ] Pretraining: next-token prediction at scale
- [ ] Supervised Fine-Tuning (SFT)
- [ ] RLHF — Reinforcement Learning from Human Feedback
- [ ] Direct Preference Optimization (DPO)
- [ ] Group Relative Policy Optimization (GRPO)
- [ ] Parameter-efficient fine-tuning: LoRA, QLoRA, adapters
- [ ] Knowledge distillation
- [ ] Quantization (int8, int4, GPTQ, AWQ) for inference

## 3. Prompt Engineering
- [ ] Zero-shot, one-shot, few-shot prompting
- [ ] Chain-of-Thought and self-consistency
- [ ] ReAct (reasoning + acting) prompting
- [ ] Structured output (JSON/XML) prompting
- [ ] Prompt injection and jailbreaking — attack and defense

## 4. Retrieval-Augmented Generation (RAG)
- [ ] RAG architecture: retriever + generator
- [ ] Chunking strategies (fixed, semantic, recursive, parent-child)
- [ ] Embedding model selection
- [ ] Hybrid search (keyword + vector) and re-ranking
- [ ] Query transformation: HyDE, decomposition, step-back prompting
- [ ] GraphRAG
- [ ] Evaluating RAG: faithfulness, relevance, context precision/recall
- [ ] Failure modes: hallucination despite correct context, "lost in the middle," stale knowledge

## 5. Evaluation
- [ ] Perplexity and other intrinsic metrics
- [ ] LLM-as-judge evaluation
- [ ] Benchmark suites (MMLU, HellaSwag, etc.) — what they do and don't tell you
- [ ] Evaluating for hallucination, toxicity, bias

## 6. Multimodal & Generative Models
- [ ] Vision-Language Models (VLMs)
- [ ] Vision-Language-Action models (VLAs)
- [ ] Diffusion models vs autoregressive generation
- [ ] Diffusion Language Models (DLMs)

## 7. Serving & Production (LLMOps)
- [ ] Inference optimization: batching, speculative decoding, Paged Attention
- [ ] Cost/latency tradeoffs at scale
- [ ] Guardrails and safety filtering in production

## Further practice
- [amitshekhariitbhu/ai-engineering-interview-questions](https://github.com/amitshekhariitbhu/ai-engineering-interview-questions) (Apache-2.0) — extensive LLM/RAG/agents Q&A bank, the primary reference for this section
- [alirezadir/AIMLInterviews — ML Fundamentals §5-6](https://github.com/alirezadir/AIMLInterviews/blob/main/src/ml-fundamental.md) (MIT) — foundation model & multimodal breadth topics
