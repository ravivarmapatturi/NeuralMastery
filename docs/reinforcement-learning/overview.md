---
sidebar_position: 1
---

# Reinforcement Learning — Overview

Every part of this site that mentions RLHF, PPO, GRPO, or DQN has been borrowing vocabulary from a self-contained field with its own theory — this section is that theory, from first principles. [Advanced Architectures — Reinforcement Learning Networks](../deep-learning/advanced-architectures.md#reinforcement-learning-networks) already introduced DQN, policy gradients, actor-critic, and PPO as *architectures*; this section covers the *problem formulation and theory* those architectures are solutions to.

## What's in this section

- **[RL Fundamentals](./rl-fundamentals.md)** — Markov Decision Processes, the Bellman equations, policies and value functions, Q-learning and SARSA — the theoretical foundation everything else in RL builds on.
- **[Advanced RL](./advanced-rl.md)** — SAC and TD3 (continuous-control refinements beyond PPO), offline RL, imitation learning, inverse RL, and how RLHF/RLAIF/GRPO (already covered for LLM alignment) fit into this same theoretical framework.

## Why RL Shows Up Everywhere on This Site

RL isn't just "game-playing AI" — it's the framework for *any* problem where an agent takes a sequence of actions that affect a changing environment, and only finds out how good those actions were after the fact (possibly much later, and possibly only as a combined effect of many actions together). That framing applies directly to: training an LLM to be helpful via [RLHF](../llms-genai/training-pipeline.md#rlhf--reinforcement-learning-from-human-feedback), an [agent](../agents/agent-architectures.md) deciding which tool to call next, a [recommender system](../machine-learning/recommender-systems.md) choosing what to show a user across a session, and classic game-playing/robotics — all genuinely instances of the same underlying problem this section formalizes.

See the [roadmap](./roadmap.md) for the full ordered path.
