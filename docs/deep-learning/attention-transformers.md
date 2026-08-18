---
sidebar_position: 7
---

import AttentionStepThrough from '@site/src/components/viz/AttentionStepThrough';
import ThemedImage from '@theme/ThemedImage';
import attentionQkvDark from './img/attention-qkv.png';
import attentionQkvLight from './img/attention-qkv-light.png';
import rnnVsAttnDark from './img/rnn-vs-attention.png';
import rnnVsAttnLight from './img/rnn-vs-attention-light.png';
import archDark from './img/transformer-architecture.png';
import archLight from './img/transformer-architecture-light.png';
import tokEmbDark from './img/token-embeddings.png';
import tokEmbLight from './img/token-embeddings-light.png';
import w1Dark from './img/attn-worked-01-embeddings.png';
import w1Light from './img/attn-worked-01-embeddings-light.png';
import w2Dark from './img/attn-worked-02-qkv-projections.png';
import w2Light from './img/attn-worked-02-qkv-projections-light.png';
import w3Dark from './img/attn-worked-03-raw-scores.png';
import w3Light from './img/attn-worked-03-raw-scores-light.png';
import w4Dark from './img/attn-worked-04-scaled-scores.png';
import w4Light from './img/attn-worked-04-scaled-scores-light.png';
import w4bDark from './img/attn-worked-04b-sqrt-dk-comparison.png';
import w4bLight from './img/attn-worked-04b-sqrt-dk-comparison-light.png';
import w5Dark from './img/attn-worked-05-softmax-weights.png';
import w5Light from './img/attn-worked-05-softmax-weights-light.png';
import w6Dark from './img/attn-worked-06-output.png';
import w6Light from './img/attn-worked-06-output-light.png';
import multiHeadDark from './img/multi-head-attention.png';
import multiHeadLight from './img/multi-head-attention-light.png';
import padMaskDark from './img/masking-padding.png';
import padMaskLight from './img/masking-padding-light.png';
import causalMaskDark from './img/masking-causal.png';
import causalMaskLight from './img/masking-causal-light.png';
import crossAttnDark from './img/cross-attention-wiring.png';
import crossAttnLight from './img/cross-attention-wiring-light.png';
import posencSinDark from './img/posenc-sinusoids.png';
import posencSinLight from './img/posenc-sinusoids-light.png';
import posencHeatDark from './img/posenc-heatmap.png';
import posencHeatLight from './img/posenc-heatmap-light.png';
import addNormDark from './img/add-norm.png';
import addNormLight from './img/add-norm-light.png';
import ffnDark from './img/feed-forward.png';
import ffnLight from './img/feed-forward-light.png';
import encLayerDark from './img/encoder-layer.png';
import encLayerLight from './img/encoder-layer-light.png';
import finalSoftmaxDark from './img/final-softmax.png';
import finalSoftmaxLight from './img/final-softmax-light.png';

# Attention & Transformers

The architecture behind GPT, Claude, LLaMA, and essentially every modern large model — text, vision, and beyond. This page follows the original architecture end to end: from *why* it exists, through every mechanism in the paper, worked out with real numbers rather than left abstract.

## Why This Architecture Exists

### Problems With RNNs

Three specific, compounding problems, in the order they actually bite:

- **Inputs are processed sequentially** — step $t$ can't start until $h_{t-1}$ exists, so there's no parallelism across time, no matter how much compute is available.
- **Slow computation for long sequences** — a direct consequence of the above: a sequence of length $T$ costs $T$ sequential steps, with no shortcut around it.
- **Vanishing or exploding gradients** — the same weight matrix gets multiplied into the gradient once per time step during backpropagation-through-time, so gradients either shrink toward zero or blow up exponentially over long sequences. See [Vanishing and Exploding Gradients, Derived](./sequence-models.md#vanishing-and-exploding-gradients-derived) for the full chain-rule walkthrough of exactly how and why this happens.

[Sequence Models](./sequence-models.md) covers RNN/LSTM/GRU/Seq2Seq in depth and ends on their shared limitation: everything up through Seq2Seq+Attention kept **recurrence** — step $t$ can't start until step $t-1$ finishes, so there's no parallelism across time, and training on long sequences is slow no matter how good the gating is. The Transformer's move is to remove recurrence entirely and let every position attend directly to every other position, in parallel, regardless of distance:

<ThemedImage alt="RNN processes tokens strictly sequentially, each step waiting for the previous one; attention gives every position direct, parallel access to every other position" sources={{light: rnnVsAttnLight, dark: rnnVsAttnDark}} />

Trading recurrence for attention doesn't remove cost — it just changes its shape, from *sequential steps* to *quadratic attention cost in sequence length* (more on that in [Common Problems & SOTA Solutions](#common-problems--sota-solutions) below), which turns out to be a much more parallelizable problem to have.

## The Shape of the Architecture

Before any of the individual mechanisms, here's every block named once, top to bottom — nothing that follows should be an unfamiliar shape. An **encoder** (left) builds a full-context representation of the input; a **decoder** (right) generates the output one token at a time, conditioned on that representation via cross-attention. Both stacks repeat $N=6$ times in the base model from the original paper:

<ThemedImage alt="Bird's-eye Transformer architecture: encoder and decoder stacks, each repeating 6 times, connected by cross-attention" sources={{light: archLight, dark: archDark}} />

## Input Embeddings

Each token in the vocabulary is looked up in a learned embedding table, producing a vector of length $d_{\text{model}} = 512$ in the base model — the same lookup at every position, with **positional encoding** (below) added afterward to inject order:

<ThemedImage alt="A token is looked up in a learned embedding table, producing a d_model=512 vector" sources={{light: tokEmbLight, dark: tokEmbDark}} />

## Self-Attention: Query, Key, Value

For each token, the model computes three vectors via learned linear projections: a **Query** (what am I looking for), a **Key** (what do I contain, for others to find), and a **Value** (what do I actually offer if selected).

<ThemedImage alt="Self-attention: token embeddings produce Query, Key, and Value, which combine into a weighted output" sources={{light: attentionQkvLight, dark: attentionQkvDark}} />

Attention scores between token $i$ and token $j$ are computed as $Q_i \cdot K_j$ (a dot product — see [Linear Algebra](../mathematics-for-ai/linear-algebra.md)), scaled and passed through softmax to get weights, which are then used to compute a weighted sum of all Value vectors:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

### A Full Worked Example

The formula above is compact enough to skim past without really seeing it compute anything. Here it is with real numbers — 3 tokens ("The cat sat"), $d_{\text{model}} = 4$ (far smaller than the paper's 512, purely so every value fits on screen), one head. Every matrix below was computed with `numpy`, not hand-picked to look nice.

**1. Token embeddings** — each token is a length-4 vector:

<ThemedImage alt="Token embeddings for The, cat, sat as 3x4 matrix X" sources={{light: w1Light, dark: w1Dark}} />

**2. Project to Query, Key, Value** — three separate learned linear projections of the same input, $Q = XW_Q$, $K = XW_K$, $V = XW_V$:

<ThemedImage alt="Q, K, V projections computed from X via three separate weight matrices" sources={{light: w2Light, dark: w2Dark}} />

**3. Raw attention scores** — every Query dotted against every Key, $QK^T$:

<ThemedImage alt="Raw attention scores as a 3x3 matrix from Q times K transpose" sources={{light: w3Light, dark: w3Dark}} />

**4. Scale by $\sqrt{d_k}$** — divide every score by $\sqrt{4}=2$:

<ThemedImage alt="Scaled attention scores, divided by square root of d_k" sources={{light: w4Light, dark: w4Dark}} />

**5. Softmax** — each row becomes a probability distribution over which tokens to attend to:

<ThemedImage alt="Softmax attention weights, each row summing to 1" sources={{light: w5Light, dark: w5Dark}} />

**6. Weighted sum** — multiply the weights by $V$ to get each token's new, context-mixed representation:

<ThemedImage alt="Final output as weighted sum of Value vectors" sources={{light: w6Light, dark: w6Dark}} />

Read the last two steps as the whole mechanism in miniature: softmax turns raw compatibility scores into a proper probability distribution per token, and the weighted sum is a soft, differentiable lookup — "give me mostly Value 3's content, a little of Value 2's, almost none of Value 1's," instead of a hard, non-differentiable index lookup.

### Why Scale by the Square Root of the Key Dimension

The part most explanations wave a hand at instead of deriving. If a Query and Key's components are independent with mean 0 and variance 1, their dot product $q \cdot k = \sum_{i=1}^{d_k} q_i k_i$ is a sum of $d_k$ independent terms — and variance adds across independent terms, so the dot product ends up with **variance $d_k$**, not variance 1. As $d_k$ grows, raw scores grow with it, pushing softmax toward a near-one-hot distribution where gradients through every non-max entry are vanishingly small. Dividing by $\sqrt{d_k}$ renormalizes the variance back down to 1, regardless of dimension:

<ThemedImage alt="Softmax weights before and after sqrt(d_k) scaling, showing the unscaled distribution is more saturated toward one token" sources={{light: w4bLight, dark: w4bDark}} />

Same worked example, same raw scores — softmax without scaling puts 0.705 of its weight on a single token; scaled, that peak drops to 0.547, leaving real, learnable gradient on the other two tokens instead of squeezing them toward zero.

**The result**: every token can directly attend to every other token in the sequence, in a single step — no sequential bottleneck like RNNs had, and no distance penalty for far-apart tokens.

## Multi-Head Attention

Instead of one attention computation, run several in parallel ("heads"), each with its own learned Q/K/V projections, then concatenate the results. Different heads tend to specialize — one might track syntactic relationships, another long-range coreference, another local patterns. $d_{\text{model}}=512$ splits into $h=8$ heads of $d_k=64$ each; every head runs the full scaled-dot-product mechanism above independently, and the outputs are concatenated back to 512 dimensions and projected once more through $W^O$:

<ThemedImage alt="Multi-head attention: d_model splits into 8 parallel heads, each running attention independently, concatenated and projected through W_O" sources={{light: multiHeadLight, dark: multiHeadDark}} />

$$\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_8)\,W^O$$

**Grouped-Query Attention (GQA)**: a memory/speed optimization where multiple query heads share the same key/value heads, reducing the size of the KV cache (below) at inference time with minimal quality loss — used in most modern production LLMs.

Type your own sentence below and watch real $QK^T/\sqrt{d_k} \to \text{softmax}$ attention weights compute live — click any row token to see exactly how much attention it pays to every other token, and switch heads to see the "different heads specialize differently" claim above actually produce different attention patterns for the same sentence.

<AttentionStepThrough />

*The embeddings and Q/K/V weights here are deterministic demo values, not a trained model's — this shows the real computation attention performs, not what a trained model has learned to attend to. See [Foundation Model Internals](../llms-genai/foundation-model-internals.md#tokenization) for how real tokenization (subword BPE) differs from this component's simpler word-level splitting.*

## Masking

Two unrelated reasons to block certain positions from attending to certain others, both implemented the same way: set the blocked score to $-\infty$ before softmax (`masked_fill(condition, -inf)`), so it becomes exactly 0 probability after softmax.

**Padding mask** — sequences in a batch are padded to a common length; a real token should never attend to a `<pad>` placeholder, since it carries no information:

<ThemedImage alt="Padding mask: real tokens attend to real tokens, never to the pad token" sources={{light: padMaskLight, dark: padMaskDark}} />

**Causal (look-ahead) mask** — the decoder generates one token at a time and must never see the future token it's being trained to predict, so each position can only attend to itself and earlier positions:

<ThemedImage alt="Causal mask: each query position can only attend to itself and earlier key positions, upper triangle blocked" sources={{light: causalMaskLight, dark: causalMaskDark}} />

This is exactly what "causal (masked) self-attention" means in the GPT-lineage section [below](#decoder-only-the-gpt-lineage) — the same mechanism, applied inside the decoder's self-attention specifically.

## Cross-Attention

In encoder-decoder architectures (like the original Transformer for translation), the decoder's queries attend to the *encoder's* keys and values rather than its own — letting the decoder pull relevant information from the full input sequence at every generation step. This is the one genuinely new idea beyond self-attention, and the direct, more powerful successor to the sequence-to-sequence bottleneck problem from [Sequence Models](./sequence-models.md):

<ThemedImage alt="Self-attention draws Q, K, V from one source; cross-attention draws Q from the decoder and K, V from the encoder output" sources={{light: crossAttnLight, dark: crossAttnDark}} />

## Positional Encoding

Attention has no inherent sense of token order — $QK^T$ treats the sequence as an unordered set unless you tell it otherwise. **Positional encoding** injects order information:

- **Absolute (sinusoidal)**: add a fixed, deterministic pattern based on position directly to each token's embedding.
- **RoPE (Rotary Position Embedding)**: instead of adding a position signal, *rotates* the Q and K vectors by an angle proportional to position — has the elegant property that the dot product between two rotated vectors naturally encodes their *relative* distance. This is the dominant choice in modern LLMs because it generalizes better to sequence lengths longer than what was seen in training.

The original paper's sinusoidal formula:

$$PE(pos, 2i) = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right) \qquad PE(pos, 2i+1) = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

Plotted for real — a handful of dimensions across 100 positions, each a sine/cosine wave at a different frequency:

<ThemedImage alt="Positional encoding sinusoids at different frequencies across sequence position" sources={{light: posencSinLight, dark: posencSinDark}} />

Why *sine and cosine specifically*, not some other periodic function: for any fixed offset $k$, $PE(pos+k)$ can be written as a linear function of $PE(pos)$ — the encoding makes relative position linearly recoverable, which is exactly what lets attention learn to use it. Stacking every dimension into one matrix shows the pattern the formula produces: low dimensions oscillate fast (fine position detail), high dimensions oscillate slow (coarse position), so every position gets a unique fingerprint across the full vector:

<ThemedImage alt="The full positional encoding matrix as a heatmap, low dimensions oscillating fast and high dimensions slow" sources={{light: posencHeatLight, dark: posencHeatDark}} />

## The Full Transformer Block

Each block is: **self-attention → add & normalize → feed-forward network → add & normalize** again.

**Add & Norm**: the sublayer's output is added back to its own input — a residual/skip connection, letting gradients flow straight through depth without having to pass through every sublayer's transformation — then normalized. The original paper places this *after* the sublayer (post-norm): $\text{LayerNorm}(x + \text{Sublayer}(x))$:

<ThemedImage alt="Add and Norm: residual connection adds the sublayer's input back to its output, then LayerNorm normalizes" sources={{light: addNormLight, dark: addNormDark}} />

**Position-wise feed-forward network**: two linear layers with a ReLU between, applied identically and independently to every position. Attention mixes information *across* tokens; the FFN adds a non-linear transform *per token* afterward:

$$\text{FFN}(x) = \max(0, xW_1+b_1)W_2+b_2$$

<ThemedImage alt="Feed-forward network: linear layer expanding to d_ff=2048, ReLU, linear layer projecting back to 512" sources={{light: ffnLight, dark: ffnDark}} />

Put together, that's one full encoder layer — self-attention, Add & Norm, feed-forward, Add & Norm — and $N=6$ identical layers (independently learned weights each) are stacked, every layer's output feeding the next layer's input:

<ThemedImage alt="One assembled encoder layer: self-attention, add and norm, feed forward, add and norm, stacked 6 times" sources={{light: encLayerLight, dark: encLayerDark}} />

The decoder layer adds one extra sublayer in the middle — masked self-attention, then cross-attention (above), then feed-forward, each followed by Add & Norm — also stacked $N=6$ times. At the very top of the decoder stack, the final output vector is projected through one more linear layer into vocabulary-sized logits, then softmax turns those into a probability distribution over the next token:

<ThemedImage alt="Final linear and softmax: decoder output projected to vocabulary-sized logits, softmax gives a next-token probability distribution" sources={{light: finalSoftmaxLight, dark: finalSoftmaxDark}} />

Stack many of these blocks, and you have GPT-style decoder-only models (predict next token, used by essentially every modern LLM), or encoder-only models (BERT-style, used for embeddings/classification), or encoder-decoder models (T5-style, used for translation/summarization).

## Vision Transformers (ViT)

Split an image into fixed-size patches, treat each patch like a "token" (via a linear projection), add positional encoding, and feed the sequence through a standard Transformer encoder. Proof that attention isn't text-specific — it's a general-purpose mechanism for relating elements of *any* sequence, which is also why multimodal models can mix image patches and text tokens in a single attention computation. See [Vision Architectures](./vision-architectures.md) for ViT's variants (DeiT, Swin) and how vision Transformers get used for detection and segmentation, not just classification.

## The Three Transformer Lineages

The original 2017 Transformer had both an encoder and a decoder (built for translation). Three families since then each kept a different piece, because different tasks need different pieces:

### Encoder-only: the BERT lineage

Keeps only the encoder — every token attends to every other token *bidirectionally* (no masking), producing rich contextual representations rather than generating text. Trained with **Masked Language Modeling** (randomly mask tokens, predict them from both left and right context) rather than next-token prediction.

- **BERT** (2018) — the original: bidirectional encoder pretraining, then fine-tuned per downstream task (classification, NER, QA). Made "pretrain then fine-tune" the standard NLP recipe.
- **RoBERTa** — BERT with a more careful, longer training recipe (more data, bigger batches, no next-sentence-prediction objective) — showed BERT itself was meaningfully undertrained, not that the architecture needed to change.
- **ALBERT** — shrinks BERT's parameter count via factorized embeddings and cross-layer parameter sharing, trading some capacity for a much smaller footprint.
- **DistilBERT** — a smaller BERT trained via **knowledge distillation** (a compact "student" model trained to match a larger "teacher" model's outputs) — roughly BERT's accuracy at a fraction of the size and latency.
- **SBERT (Sentence-BERT)** — fine-tunes BERT with a contrastive/siamese objective specifically to produce good *sentence-level* embeddings for similarity/retrieval — the direct ancestor of today's embedding models used in RAG (see [LLM Hosting & Serving Patterns](../mlops/llm-hosting-and-serving-patterns.md)).

Encoder-only models are the right choice whenever you need a representation *of* text (classification, retrieval, embeddings) rather than *generation of* text.

### Decoder-only: the GPT lineage

Keeps only the decoder, with **causal (masked) self-attention** — each token can only attend to itself and earlier tokens, never future ones, matching how text is actually generated one token at a time. Trained with plain next-token prediction on raw text at massive scale.

- **GPT / GPT-2 / GPT-3** — each generation scaled up parameters and data, with GPT-3 demonstrating that scale alone produces qualitatively new abilities (few-shot in-context learning without any fine-tuning).
- **GPT-4 and beyond, LLaMA, Mistral, Claude's underlying architecture** — all decoder-only Transformers at this point; differences between modern frontier models are mostly in data quality/scale, training technique (RLHF/RLAIF, see [LLMs & GenAI](../llms-genai/roadmap.md)), and architectural refinements (RoPE, GQA, different normalization) layered on the same decoder-only skeleton.

Decoder-only is the dominant architecture for essentially all modern general-purpose LLMs, because a single next-token objective, trained at sufficient scale, turns out to subsume translation, summarization, QA, and reasoning as special cases of "predict what comes next."

### Encoder-decoder: the T5 lineage

Keeps both halves, connected by cross-attention (above) — an encoder builds a full-context representation of the input, a decoder generates output conditioned on it. The natural fit for tasks that transform one sequence into a genuinely different one.

- **T5 (Text-to-Text Transfer Transformer)** — reframes *every* NLP task (classification, translation, summarization) as text-to-text: the input is a text prompt describing the task, the output is text — a single architecture and training objective for tasks that previously needed task-specific heads.
- **BART** — pretrained as a denoising autoencoder (corrupt text with various noise functions, reconstruct the original) — particularly strong for summarization and other generation tasks that start from an existing document.
- **Original Transformer (2017)** and **modern machine translation systems** remain the clearest encoder-decoder use case: translate French *into* English is genuinely "transform sequence A into a related but different sequence B," which is exactly what cross-attention was built for.

Encoder-decoder models have become less common for general-purpose chat/instruction-following (decoder-only dominates there), but remain a strong choice for well-defined sequence-to-sequence tasks with a clear input/output split.

## Common Problems & SOTA Solutions

- **Vanishing gradients in deep stacks** → residual connections + normalization (inherited from [Training Deep Networks](./training-deep-networks.md))
- **Quadratic cost of self-attention** ($O(n^2)$ in sequence length, see [Algorithms & Data Structures](../mathematics-for-ai/algorithms-data-structures.md)) → **Flash Attention** (a GPU-memory-aware exact implementation that avoids materializing the full attention matrix), sparse/linear attention variants for very long contexts
- **Growing KV cache during long generation** → Grouped-Query Attention, Paged Attention (memory-efficient KV cache management, covered further in [LLMs & GenAI](../llms-genai/roadmap.md))
- **Slow inference** → quantization, knowledge distillation, pruning
- **Training instability at scale** → careful initialization, warmup schedules, gradient clipping, mixed precision

Next: [Vision Architectures](./vision-architectures.md) — detection, segmentation, and the ViT variants built for them; then on to [LLMs & GenAI](../llms-genai/roadmap.md) for where this architecture becomes ChatGPT-class systems.
