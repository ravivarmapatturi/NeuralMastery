---
sidebar_position: 1
---

# AI Evaluation — Overview

Evaluation shows up throughout this site already — [Model Evaluation & Metrics](../machine-learning/model-evaluation-metrics.md) for classical ML, [LLM Evaluation & RAGOps](../mlops/llm-evaluation-and-ragops.md) for production LLM/RAG monitoring, evaluation sections inside [RAG](../llms-genai/rag.md) itself. This section is the discoverable home that ties all of it together, and fills in what was genuinely missing: **agent evaluation**, **benchmark design methodology**, and **adversarial evaluation/red teaming** as their own disciplines rather than afterthoughts.

The unifying question across every page here: not just "what's the metric," but "does this metric actually measure what I care about, and can I trust the number it produces."

## What's in this section

- **[Evaluation Fundamentals](./evaluation-fundamentals.md)** — what makes a benchmark actually good (construct validity, contamination, saturation), golden datasets, and continuous evaluation in production.
- **[LLM, RAG & Agent Evaluation](./llm-rag-agent-evaluation.md)** — LLM-as-a-judge in depth, RAG evaluation (cross-linked), and agent evaluation — trajectory analysis, task success rate, tool-call accuracy — which had no dedicated treatment anywhere on the site before this.
- **[Human & Adversarial Evaluation](./human-and-adversarial-evaluation.md)** — human evaluation methodology, pairwise/preference evaluation, adversarial evaluation, and red teaming.

## Why This Deserves Its Own Section

"Ship it if the eval score looks good" is exactly backwards when the eval itself is untrustworthy — a benchmark that's leaked into training data, a golden dataset that's stale, an LLM-judge that's systematically biased toward longer answers, or a human eval with too few raters to be statistically meaningful all produce a number that *looks* like signal and isn't. Evaluation methodology is a discipline in its own right, not a free byproduct of building the model/RAG pipeline/agent it's measuring.

See the [roadmap](./roadmap.md) for the full ordered path.
