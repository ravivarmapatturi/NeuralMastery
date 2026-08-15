---
sidebar_position: 3
---

# Healthcare AI

The domain where the general AI toolkit's stakes are highest — a hallucinated RAG answer in a customer-support bot is an annoyance; a hallucinated answer in a clinical decision-support tool can directly harm a patient. Every technique below is the same general-purpose toolkit from the rest of this site, with the domain-specific constraints that actually matter for deploying it safely made explicit.

## Clinical NLP

Extracting structured information from unstructured clinical text — physician notes, discharge summaries, radiology reports — using the same [NLP task taxonomy](../nlp/nlp-task-taxonomy.md) and [NER](../nlp/classical-nlp.md#named-entity-recognition-ner) machinery covered generally, applied to clinical entity types specifically (diagnoses, medications, dosages, symptoms) and clinical coding standards (ICD-10 for diagnoses, CPT for procedures, SNOMED CT for clinical terms) that have no equivalent in general-domain NLP. Domain-specific pretrained models (trained or further-pretrained on clinical text corpora, extending [LLM Pretraining](../llms-genai/training-pipeline.md)'s general recipe with clinical-domain data) consistently outperform general-purpose models on clinical NLP tasks — clinical language has enough domain-specific vocabulary, abbreviation conventions, and structure that general-domain pretraining alone under-serves it.

## Medical Imaging

Applying [Computer Vision](../computer-vision/roadmap.md)'s classification/detection/segmentation task taxonomy to radiology (X-rays, CT, MRI), pathology (microscopy slides), and dermatology (skin images) — with two domain-specific complications general computer vision datasets don't have: **extreme class imbalance** (a screening dataset is overwhelmingly normal cases, with the clinically important positive cases rare — see [Handling Messy Data](../machine-learning/ml-workflow-fundamentals.md#handling-messy-data)'s imbalanced-class guidance, which applies directly and matters more here), and **the cost asymmetry of errors** (a missed cancer diagnosis and a false alarm have very different real consequences, directly shaping [threshold optimization](../machine-learning/model-evaluation-metrics.md#threshold-optimization) choices rather than defaulting to a standard 0.5 cutoff).

## EHR (Electronic Health Record) Data

Structured, longitudinal patient data (lab results, vitals, diagnoses, medications over time) — a genuinely different data shape from clinical text or imaging: irregularly-sampled time series (labs drawn at clinically-driven, not fixed, intervals), extensive missingness (a lab not ordered isn't "missing data" in the usual sense — it's itself a clinically meaningful signal about what a clinician thought was and wasn't relevant), and a mix of structured codes and free text in the same record. This combination is why EHR modeling often needs bespoke handling rather than directly applying [Time Series Forecasting](../machine-learning/time-series-forecasting.md)'s standard techniques unmodified — the missingness-is-informative property in particular breaks the "missing at random" assumption much classical missing-data handling relies on.

## Medical RAG

[RAG Engineering](../llms-genai/rag.md) applied to clinical knowledge (medical literature, clinical guidelines, drug references) — with faithfulness and groundedness (see [RAG — Evaluating RAG](../llms-genai/rag.md#evaluating-rag)) mattering more strictly than in most RAG applications, since an ungrounded claim here isn't just wrong, it's a wrong claim wearing the authority of a medical reference. Source provenance and recency matter especially: clinical guidelines change, and a medical RAG system needs to be confident it's retrieving from *current* guidance, not an outdated version sitting in an under-maintained knowledge base — directly the [stale knowledge base](../llms-genai/rag.md#common-failure-modes) failure mode, with unusually high stakes attached to it in this domain.

## Clinical Agents and Human-in-the-Loop Requirements

[Agent Architectures — Human-in-the-Loop](../agents/agent-architectures.md#human-in-the-loop) isn't optional guidance in clinical settings — it's close to a hard requirement: an agent that can draft a suggested diagnosis, suggested order, or suggested treatment plan should virtually always require explicit clinician review and approval before any action takes effect, never autonomous execution. The clinician remains the accountable decision-maker; the agent's role is narrowing and accelerating what the clinician has to consider, not replacing their judgment — a stricter version of the [excessive agency](../ai-security/owasp-llm-top-10-and-prompt-attacks.md#excessive-agency) principle from AI Security, applied to a domain where the cost of an unsupervised bad action is uniquely high.

## Privacy and HIPAA

**HIPAA** (the U.S. Health Insurance Portability and Accountability Act) sets legal requirements for protecting patient health information — direct implications for the entire stack covered elsewhere on this site: PII/PHI detection and redaction (extending [AI Security's PII protection](../mlops/security-and-reproducibility.md) guidance to the specifically regulated category of health information), access controls scoped to legitimate clinical need (not just "authenticated," but "authorized for *this specific patient's* data"), audit logging of every access to patient data, and careful handling of *any* third-party service (including an LLM API) that might process patient data — often requiring a Business Associate Agreement and sometimes ruling out certain hosted API options entirely in favor of self-hosted, on-premises, or specifically HIPAA-compliant-certified infrastructure (see [LLM Hosting & Serving Patterns](../mlops/llm-hosting-and-serving-patterns.md) for the self-hosting options this consideration often pushes a healthcare deployment toward).

## Clinical Evaluation and Hallucination Risk

Standard [AI Evaluation](../ai-evaluation/roadmap.md) methodology needs real reinforcement here: evaluation sets should be reviewed by qualified clinicians, not just data scientists (the "domain-expert rater" point from [Human Evaluation Methodology](../ai-evaluation/human-and-adversarial-evaluation.md#human-evaluation-methodology) applies with unusual force), and hallucination — a model confidently stating an incorrect clinical fact — is the single most consequential failure mode to actively evaluate against and guard against in deployment, not an occasional inconvenience. The general principle from [RAG evaluation](../llms-genai/rag.md#evaluating-rag) (faithfulness, groundedness) becomes closer to a deployment gate than a nice-to-have metric in this domain.

Next: [Other Domain Applications](./other-domain-applications.md) — the same general-toolkit-meets-domain-constraints lens applied to finance, semiconductor, cybersecurity, robotics, and manufacturing.
