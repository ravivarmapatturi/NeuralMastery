---
sidebar_position: 6
---

# Sequence Models

Text, audio, time series, DNA — anywhere order carries meaning, you need an architecture that processes sequences, not fixed-size independent inputs.

## Recurrent Neural Networks (RNNs)

An RNN processes a sequence one element at a time, maintaining a **hidden state** that's updated at each step and carries information forward: $h_t = f(h_{t-1}, x_t)$. In principle, this lets information from any earlier point in the sequence influence later predictions.

**The vanishing gradient problem, again**: because the same weights are applied repeatedly across many time steps, gradients during backpropagation-through-time shrink (or explode) even faster than in a deep feedforward network (see [Training Deep Networks](./training-deep-networks.md)). In practice, plain RNNs struggle to remember anything more than ~10-20 steps back.

## LSTM and GRU

**LSTM (Long Short-Term Memory)** introduces a separate "cell state" plus gating mechanisms (input, forget, output gates) that explicitly control what information gets added, kept, or discarded at each step — a direct, engineered fix for the vanishing gradient problem in RNNs.

**GRU (Gated Recurrent Unit)** simplifies LSTM's gating into two gates instead of three, with fewer parameters and often comparable performance — a common practical choice when compute is limited.

## Sequence-to-Sequence Models

For tasks where both input and output are sequences of different lengths (translation, summarization): an **encoder** RNN compresses the input sequence into a fixed representation, and a **decoder** RNN generates the output sequence from that representation, one token at a time.

**The bottleneck problem**: compressing an entire input sequence into one fixed-size vector loses information, especially for long sequences — this is precisely the problem that motivated the invention of **attention** (see [Attention & Transformers](./attention-transformers.md)): instead of one fixed summary, let the decoder look back at *all* encoder states directly, weighted by relevance.

## Where This Leads

RNNs/LSTMs are still used for genuinely streaming or resource-constrained applications, but for nearly everything else — language modeling, translation, any large-scale sequence task — attention-based Transformers have replaced them, precisely because Transformers process the whole sequence in parallel (no sequential bottleneck) and let every position attend directly to every other position, regardless of distance.

Next: [Attention & Transformers](./attention-transformers.md) — the architecture behind every modern LLM.
