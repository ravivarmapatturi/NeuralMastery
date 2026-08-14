---
sidebar_position: 3
---

# Foundation Model & Transformer Internals

The engineering details that turn the Transformer architecture (see [Attention & Transformers](../deep-learning/attention-transformers.md)) into a model you can actually run efficiently at billions of parameters.

## Tokenization

Models don't see raw text — they see a sequence of integer token IDs from a fixed vocabulary. **BPE (Byte Pair Encoding)** builds this vocabulary by starting with individual characters/bytes and iteratively merging the most frequent adjacent pair into a new token, until reaching a target vocabulary size. **WordPiece** and **SentencePiece** are close variants (WordPiece used by BERT; SentencePiece treats the input as a raw stream, sidestepping the need for pre-tokenized words, useful for languages without clear word boundaries).

Why subword tokenization at all, instead of whole words or single characters: whole-word vocabularies explode in size and can't handle unseen words; single-character vocabularies produce very long sequences (expensive, given attention's $O(n^2)$ cost — see [Algorithms & Data Structures](../mathematics-for-ai/algorithms-data-structures.md)). Subwords are the practical middle ground — common words stay as one token, rare/novel words decompose into recognizable pieces.

## Embeddings

The first layer of any Transformer is an embedding table — a lookup mapping each token ID to a learned vector. These vectors start random and, through training, come to encode meaning: semantically related tokens end up with similar embeddings (high cosine similarity — see [Linear Algebra](../mathematics-for-ai/linear-algebra.md)).

## KV Cache

During autoregressive generation, the model produces one token at a time, and naively would recompute Key and Value vectors for the *entire* sequence so far at every single step — wasteful, since those K/V vectors for already-generated tokens never change. The **KV cache** stores them once and reuses them, so each new token only requires computing Q/K/V for itself. This is the single biggest practical speedup in LLM inference, and it's also the primary consumer of GPU memory during generation — which is exactly why GQA and Paged Attention (below) exist.

## Architecture Families

- **Encoder-only** (BERT-style): sees the full input at once (bidirectional attention) — good for understanding tasks (classification, embeddings), not for generation.
- **Decoder-only** (GPT-style): only attends to earlier tokens (causal/masked attention) — the dominant architecture for modern LLMs, since next-token prediction naturally trains a model that can also generate.
- **Encoder-decoder** (T5-style): separate encoder for the input and decoder for the output, connected via cross-attention — well-suited to translation/summarization where input and output are distinct sequences.

## Mixture of Experts (MoE)

Instead of every token passing through the same dense feed-forward layer, an MoE layer has many "expert" feed-forward sub-networks, and a small router network picks a small subset (e.g. 2 of 8) of experts to actually run for each token. This decouples a model's total parameter count from its per-token compute cost — you get a much larger model (more knowledge capacity) without a proportional increase in inference cost, since most parameters sit idle for any given token. Mixtral and several frontier-scale models use this.

## Efficient Attention Variants

**Grouped-Query Attention (GQA)**: multiple query heads share a single key/value head, shrinking KV cache size substantially with minimal quality loss — see [Attention & Transformers](../deep-learning/attention-transformers.md) for the full mechanism.

## Context Window

The maximum sequence length a model can process at once. Limited fundamentally by (a) the $O(n^2)$ compute/memory cost of attention, and (b) the fact that positional encoding and attention patterns learned during training may not generalize well to sequence lengths never seen in training. Longer context comes from a combination of architectural tricks (RoPE scaling, sparse attention), more efficient attention kernels (Flash Attention), and training specifically on long sequences.

Next: [Training Pipeline](./training-pipeline.md) — how a raw Transformer becomes a helpful, aligned assistant.
