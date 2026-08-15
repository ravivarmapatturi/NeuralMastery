---
sidebar_position: 5
---

import AttentionStepThrough from '@site/src/components/viz/AttentionStepThrough';

# Attention Step-Through

Type any sentence and watch the real $\text{softmax}(QK^T/\sqrt{d_k})V$ computation from [Attention & Transformers](../deep-learning/attention-transformers.md) run on it live — an actual attention heatmap and per-token attention breakdown, not a diagram of one.

<AttentionStepThrough />

## What to Try

- **Click different rows** (query tokens) and watch the bar chart on the right update — this *is* the attention weight distribution [Self-Attention: Query, Key, Value](../deep-learning/attention-transformers.md#self-attention-query-key-value) describes: how much a given token "looks at" every other token when building its output representation.
- **Switch heads** on the same sentence — since each head has independently-seeded Q/K/V weights, you'll see visibly different attention patterns for the exact same input, a concrete (if untrained) illustration of why [Multi-Head Attention](../deep-learning/attention-transformers.md#multi-head-attention) gives a model several "representation subspaces" instead of one.
- **Try a sentence with a repeated word** ("the cat sat on the mat and the dog watched the cat") and see how attention distributes across the multiple occurrences.

## What's Simplified Here, and Why

Two honest simplifications, both to keep this component small and fast rather than bundling a full tokenizer/model: tokenization is whitespace/punctuation-level, not real subword BPE (see [Foundation Model Internals — Tokenization](../llms-genai/foundation-model-internals.md#tokenization) for the real thing), and the embeddings/weights are deterministic demo values, not a trained model's. The *computation* — the actual matrix multiplies, the scaling, the softmax, the weighted sum — is exactly what a real Transformer layer performs; only the *inputs* to that computation are simplified.

Back to [Visual Lab Overview](./overview.md).
