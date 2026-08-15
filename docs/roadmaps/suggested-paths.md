---
sidebar_position: 2
---

# Suggested Paths

[The Neural Mastery Roadmap](./overview.md) is the complete, zero-to-job-ready path through every section — the right choice if you genuinely want it all. Most people don't start there with a blank goal, though; they have a specific target role in mind. These four paths reorder and *trim* the same 26 sections around four common goals, so you're not working through Graph ML and AI for Science on your way to an LLM engineering job, or through Speech & Audio on your way to an ML systems role.

Each path lists sections in order, with a one-line reason for why it's there — skip a hop if you already know it, don't skip it just because it looks unfamiliar.

## 🧮 ML Engineer

Classical ML through production systems — the role most "AI Engineer" job postings actually mean.

1. [Mathematics for AI](../mathematics-for-ai/roadmap.md) — linear algebra and probability are the language every algorithm below is written in.
2. [Machine Learning](../machine-learning/roadmap.md) — the core toolbox: regression, trees, boosting, clustering, evaluation.
3. [Deep Learning](../deep-learning/roadmap.md) — when classical ML tops out, this is what replaces it.
4. [ML System Design](../ml-system-design/roadmap.md) — the difference between "I trained a model" and "I shipped a system."
5. [MLOps](../mlops/roadmap.md) — versioning, pipelines, monitoring — how a model survives contact with production.
6. [AI Evaluation](../ai-evaluation/roadmap.md) — you can't improve what you can't measure correctly.
7. [Interview Prep](../interview-prep/roadmap.md) — DSA and ML coding rounds specifically test this exact stack.

## 🤖 LLM / GenAI Engineer

Building products on top of foundation models — RAG, agents, and the infrastructure around them.

1. [Mathematics for AI](../mathematics-for-ai/roadmap.md) — just enough linear algebra/probability to not treat attention as magic.
2. [Deep Learning](../deep-learning/roadmap.md) — specifically through attention and Transformers; that's the load-bearing chapter.
3. [NLP](../nlp/roadmap.md) — word embeddings and the task taxonomy underneath every LLM application.
4. [LLMs & GenAI](../llms-genai/roadmap.md) — foundation models, training, prompting, RAG — the center of this whole path.
5. [Databases](../databases/roadmap.md) — specifically vector databases; RAG doesn't work without one.
6. [Agents](../agents/roadmap.md) — where GenAI products are actually headed — tool use, MCP, multi-agent systems.
7. [AI Evaluation](../ai-evaluation/roadmap.md) — LLM-as-judge and agent evaluation are genuinely different from classical ML metrics.
8. [AI Security](../ai-security/roadmap.md) — prompt injection and the OWASP LLM Top 10 are now table-stakes knowledge, not optional.
9. [Interview Prep](../interview-prep/roadmap.md) — system design rounds increasingly ask you to design a RAG or agent product specifically.

## 🔬 AI Research Engineer

Reading papers and reproducing results, not just calling APIs.

1. [Mathematics for AI](../mathematics-for-ai/roadmap.md) — go deep here; research code assumes you can follow a derivation, not just call `.fit()`.
2. [Machine Learning](../machine-learning/roadmap.md) and [Deep Learning](../deep-learning/roadmap.md) — the shared vocabulary every paper is written in.
3. [Research Engineering](../research-engineering/roadmap.md) — how to actually read a paper, plus the historical lineage connecting architectures to each other.
4. [Build From Scratch](../build-from-scratch/roadmap.md) — implementing autodiff, attention, and a GPT yourself is the fastest way to stop taking a paper's claims on faith.
5. [Interpretability](../interpretability/roadmap.md) — a large, active research area in its own right, and directly useful for understanding *why* your own experiments behave the way they do.
6. [Reinforcement Learning](../reinforcement-learning/roadmap.md) or [Graph ML](../graph-ml/roadmap.md) — pick whichever matches your specific research interest; both are genuinely separate subfields with their own math.
7. [Projects](../projects/roadmap.md) — specifically the top of the ladder: a real capstone is what a research portfolio actually needs.

## 🏗️ AI Systems / Infrastructure Engineer

Making AI systems fast, reliable, and cheap at scale — less modeling, more engineering.

1. [CS Fundamentals for AI Engineers](../cs-fundamentals/roadmap.md) — operating systems, concurrency, and distributed systems fundamentals this whole path builds on.
2. [Python Engineering for AI](../python-engineering/roadmap.md) — async, memory management, and packaging matter far more here than in a notebook-only workflow.
3. [Deep Learning](../deep-learning/roadmap.md) — specifically the GPU/CUDA and distributed-training material; that's what you're actually operating.
4. [ML System Design](../ml-system-design/roadmap.md) — the 9-step framework and the case studies are exactly this role's day-to-day.
5. [MLOps](../mlops/roadmap.md) — go deep here: Kubernetes, CI/CD, monitoring, LLMOps/RAGOps at scale is most of the job.
6. [Databases](../databases/roadmap.md) — relational, vector, and graph — you'll be responsible for all three eventually.
7. [Frameworks](../frameworks/roadmap.md) — the serving and tooling layer connecting everything above.
8. [AI Security](../ai-security/roadmap.md) — infrastructure is the last line of defense against a lot of AI-specific attack classes.
9. [Interview Prep](../interview-prep/roadmap.md) — specifically system design practice; that's the round this role lives or dies on.

---

Not sure which fits? Check the [Learning Path map](../learning-path.md) for how these sections depend on each other regardless of which goal you pick — Foundations and (usually) Models come first no matter what.
