---
sidebar_position: 2
---

# ML System Design — Roadmap

How to take a model and turn it into a working, scalable production system. Framed around a repeatable 9-step formula plus worked problem categories.

## The 9-Step Framework
1. [ ] **Problem formulation** — translate a business need into an ML problem
2. [ ] **Metrics** — offline metrics (what you optimize in dev) vs online metrics (what you measure in production, e.g. CTR, retention)
3. [ ] **Architectural components** — sketch the MVP: data → features → model → serving
4. [ ] **Data collection & preparation** — sourcing, labeling, cleaning
5. [ ] **Feature engineering** — what signals actually predict the target
6. [ ] **Model development & offline evaluation** — pick a model class, validate offline
7. [ ] **Prediction service** — batch vs online serving, latency budgets
8. [ ] **Online testing & deployment** — A/B tests, shadow deployment, canary rollout
9. [ ] **Scaling, monitoring, and updates** — drift detection, retraining cadence, rollback plans

## Case Studies to Work Through
- [ ] **Recommendation systems** — candidate generation + ranking, cold start
- [ ] **Search & ranking** — retrieval, learning-to-rank, relevance
- [ ] **News feed / ads ranking**
- [ ] **NLP systems** — classification, extraction pipelines at scale
- [ ] **Computer vision systems** — detection/segmentation pipelines in production
- [ ] **GenAI / LLM systems (2026-era)** — RAG pipeline design, agent system design, LLM serving infra

## Common Problems & SOTA Solutions
- [ ] **Training-serving skew** → shared feature pipelines, feature stores
- [ ] **Cold start** (new users/items) → content-based fallback, exploration strategies
- [ ] **Feedback loops biasing the model** → randomized exploration, counterfactual evaluation
- [ ] **Model staleness / concept drift** → monitoring dashboards, scheduled retraining, online learning
- [ ] **Scaling inference to millions of requests** → caching, batching, model distillation, horizontal scaling

## Further practice
- [alirezadir/AIMLInterviews — ML System Design](https://github.com/alirezadir/AIMLInterviews/blob/main/src/MLSD/ml-system-design.md) (MIT) — the source of the 9-step formula above, plus a large bank of worked sample questions
- Chip Huyen — [Machine Learning Systems Design: 30 open-ended questions](https://huyenchip.com/machine-learning-systems-design/toc.html) and her Stanford course CS 329S
