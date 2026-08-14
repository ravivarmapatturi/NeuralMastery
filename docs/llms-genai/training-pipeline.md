---
sidebar_position: 4
---

# Training Pipeline

Going from a randomly-initialized Transformer to something like ChatGPT is a multi-stage pipeline, not a single training run.

## Pretraining

The model is trained on massive amounts of text with a simple self-supervised objective: predict the next token, given everything before it. Loss is cross-entropy between the predicted token distribution and the actual next token (see [Probability & Statistics](../mathematics-for-ai/probability-statistics.md)). This single objective, at sufficient scale, produces a model with broad world knowledge, grammar, reasoning patterns, and style — but one that isn't yet reliably *helpful* or *instructable*; it just continues text plausibly.

## Supervised Fine-Tuning (SFT)

The pretrained model is fine-tuned on a smaller, curated dataset of (instruction, ideal response) pairs, written or curated by humans. This teaches the model the *format and behavior* of being a helpful assistant — following instructions, answering directly instead of just continuing text, refusing certain requests.

## RLHF — Reinforcement Learning from Human Feedback

SFT alone isn't enough to capture nuanced preferences ("this response is *better*, not just acceptable"). RLHF adds:
1. Collect human rankings of multiple model outputs for the same prompt.
2. Train a **reward model** to predict which output humans would prefer.
3. Fine-tune the LLM with reinforcement learning (typically **PPO** — Proximal Policy Optimization) to maximize the reward model's score, while a KL-divergence penalty (see [Probability & Statistics](../mathematics-for-ai/probability-statistics.md)) keeps the fine-tuned model from drifting too far from the original SFT model — preventing it from degenerating into responses that game the reward model without actually being good.

**Reward hacking**: when the model finds a way to score highly on the reward model without genuinely satisfying human intent (e.g. being unnecessarily verbose because the reward model correlates length with thoroughness). A core failure mode RLHF practitioners actively guard against.

## Direct Preference Optimization (DPO)

A simpler alternative to RLHF: instead of training a separate reward model and running full RL, DPO reformulates the preference-learning objective so it can be optimized *directly* on preference pairs (chosen vs. rejected response) with a supervised-learning-style loss. Removes the complexity and instability of RL while achieving comparable results — widely adopted because it's simpler to implement and tune.

## Group Relative Policy Optimization (GRPO)

A more recent RL approach (notably used in DeepSeek's models) that removes the need for a separate value/critic network by instead comparing a group of sampled outputs for the same prompt against each other's average reward — reducing training cost and complexity, particularly effective for reasoning-focused fine-tuning.

## Parameter-Efficient Fine-Tuning (PEFT)

Full fine-tuning updates every parameter — expensive and requires storing a full copy of the model per fine-tuned variant. PEFT methods update far fewer parameters:

- **LoRA (Low-Rank Adaptation)**: freezes the original weights and injects small trainable low-rank matrices alongside them (see [Linear Algebra](../mathematics-for-ai/linear-algebra.md) — this works because weight *updates* during fine-tuning empirically have low effective rank). Dramatically cuts trainable parameters and memory.
- **QLoRA**: combines LoRA with quantizing the frozen base model to 4-bit precision, enabling fine-tuning of very large models on a single consumer GPU.
- **Adapters**: small trainable modules inserted between frozen layers.

## Knowledge Distillation

Train a smaller "student" model to mimic a larger "teacher" model's output distribution (not just the hard labels, but the full soft probability distribution, which carries more information about the teacher's "reasoning"). Produces smaller, faster models that retain much of the teacher's capability — used heavily to create deployable small models from expensive frontier models.

## Quantization

Reduces the numerical precision used to store model weights — from 32-bit or 16-bit floats down to 8-bit or 4-bit integers (int8, int4; GPTQ and AWQ are popular quantization algorithms). Cuts memory footprint and can speed up inference substantially, at a small, often negligible, cost to output quality — essential for running large models on limited hardware.

Next: [Prompt Engineering](./prompt-engineering.md) — getting the most out of a model without touching its weights at all.
