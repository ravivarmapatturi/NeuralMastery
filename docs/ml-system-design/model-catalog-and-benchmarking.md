---
sidebar_position: 5
---

# Model Catalog & Benchmarking Framework

Choosing a model for a system is a recurring decision this site's content can't make *for* you with a fixed answer — specific models and their benchmark scores change every few months, often faster than any static page can track responsibly. What stays durable is the **framework**: which categories of model exist, which attributes actually matter for choosing between them, and which benchmark dimensions matter for each type of system. This page is that framework — deliberately a methodology, not a snapshot leaderboard that would be stale within a quarter of being written.

## Model Categories

A rough taxonomy of the model types most system-design decisions choose between, each covered in depth elsewhere on this site:

| Category | Covered in |
|---|---|
| LLM | [LLMs & GenAI](../llms-genai/roadmap.md), [Foundation Model Internals](../llms-genai/foundation-model-internals.md) |
| VLM (vision-language) | [Modern Vision & Multimodal](../computer-vision/modern-vision-and-multimodal.md), [Multimodal & Generative Models](../llms-genai/multimodal-generative-models.md) |
| Embedding model | [RAG — Choosing an Embedding Model](../llms-genai/rag.md#choosing-an-embedding-model) |
| Reranker (cross-encoder) | [RAG — Re-ranking with Cross-Encoders](../llms-genai/rag.md#re-ranking-with-cross-encoders) |
| Speech (ASR/TTS) | [Speech & Audio Tasks](../speech-audio/speech-audio-tasks.md) |
| Image generation | [Generative Models](../deep-learning/generative-models.md) |
| Video generation/understanding | [Modern Vision & Multimodal](../computer-vision/modern-vision-and-multimodal.md) |
| Audio generation | [Speech & Audio Tasks](../speech-audio/speech-audio-tasks.md) |
| Reasoning models | [Training Pipeline — GRPO](../llms-genai/training-pipeline.md#group-relative-policy-optimization-grpo) |

## The Model Card Attribute Checklist

When evaluating *any* model against this checklist, whatever its category — the same attribute set the [Model Cards](../mlops/legal-licensing-and-governance.md#model-cards-and-data-cards) standard formalizes:

- **Architecture**: what family it belongs to (decoder-only, encoder-decoder, diffusion, etc.) — see [Attention & Transformers](../deep-learning/attention-transformers.md) and [Generative Models](../deep-learning/generative-models.md) for the architectural vocabulary.
- **Parameters**: total and (for MoE models, see [Foundation Model Internals — MoE](../llms-genai/foundation-model-internals.md#mixture-of-experts-moe)) active parameter count — active parameters, not total, determine per-token inference compute cost.
- **Context length**: maximum sequence length supported — directly bounds [KV cache memory](../mlops/llm-inference-optimization.md#kv-cache) requirements at serving time.
- **Modalities**: what input/output types the model actually supports (text-only, text+image-in, text+image+audio, etc.).
- **Training data and recency**: what it was trained on, and its effective knowledge cutoff — directly relevant to the [RAG vs. fine-tuning](../interview-prep/technology-comparisons.md#rag-vs-fine-tuning) decision.
- **License**: see [Legal, Licensing & Governance — Model Licenses](../mlops/legal-licensing-and-governance.md#model-licenses) — check the actual current terms before commercial use, every time, since terms have changed between versions of the same model family.
- **Benchmark scores**: reported scores on standard benchmarks — read alongside [AI Evaluation — Benchmark Design](../ai-evaluation/evaluation-fundamentals.md#benchmark-design)'s contamination/saturation cautions before trusting a number at face value.
- **Hardware requirements**: VRAM needed to serve at a given precision — see [LLM Inference Optimization — GGUF Ecosystem](../mlops/llm-inference-optimization.md#the-gguf-ecosystem) for concrete size-math worked examples.
- **Inference support**: which engines support it (see [LLM Inference Engines](../mlops/llm-inference-engines.md)) — a model with narrow engine support is a real operational constraint, not just a technical footnote.
- **Fine-tuning support**: whether LoRA/QLoRA tooling has mature support for the architecture — see [Training Pipeline — PEFT](../llms-genai/training-pipeline.md#parameter-efficient-fine-tuning-peft).
- **Quantization support**: whether pre-quantized versions (GGUF, AWQ, GPTQ) are readily available, or quantization has to be done in-house.
- **Use cases**: what the model card/provider explicitly states it's suited (and *not* suited) for — the out-of-scope-uses section is often more informative than the intended-use section.

## Benchmark Dimensions by System Type

What to actually measure, by the kind of system being built — durable regardless of which specific models are being compared:

**For any served model (inference benchmarking)**:
| Dimension | Covered in |
|---|---|
| Latency (TTFT, TPOT, end-to-end, P50/P95/P99) | [LLM Inference Optimization — Inference Metrics Summary](../mlops/llm-inference-optimization.md#inference-metrics-summary) |
| Throughput (tokens/sec, requests/sec) | same |
| Memory (weights + KV cache) | [LLM Inference Optimization — KV Cache](../mlops/llm-inference-optimization.md#kv-cache) |
| Cost (per 1M tokens) | [AI Cost Engineering](../mlops/ai-cost-engineering.md) |

**For retrieval (embedding/reranker benchmarking)**:
| Dimension | Covered in |
|---|---|
| Recall@k, Precision@k | [Learning-to-Rank — Ranking Evaluation Metrics](../machine-learning/learning-to-rank.md#ranking-evaluation-metrics) |
| MRR, NDCG | same |
| Retrieval latency | [RAG — Evaluating RAG](../llms-genai/rag.md#evaluating-rag) |
| Cost per query | [AI Cost Engineering](../mlops/ai-cost-engineering.md) |

**For general model quality**: see [AI Evaluation](../ai-evaluation/roadmap.md) in full — traditional metrics, LLM-as-judge, RAG evaluation, agent evaluation, and human/adversarial evaluation, each with the specific metrics and methodology to apply.

## How to Use This Page

When choosing a model for a real system: pull the current, specific candidates from primary sources (the model provider's own documentation, the inference engine's supported-models list, current leaderboards — treated with the [benchmark design](../ai-evaluation/evaluation-fundamentals.md#benchmark-design) skepticism this site teaches, not at face value) and evaluate them against the attribute checklist and benchmark dimensions above. The checklist and dimensions are what stay true regardless of which specific models exist when you're reading this — that durability is the point.

Next: [ML System Design Roadmap](./roadmap.md) — where model selection fits into the full 9-step system design framework.
