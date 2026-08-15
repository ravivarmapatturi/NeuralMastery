---
sidebar_position: 1
---

# NLP — Overview

[LLMs & GenAI](../llms-genai/roadmap.md) starts from Transformers and tokenization already in hand. This section is the layer underneath: how text was understood before (and alongside) large language models, and the task taxonomy — translation, summarization, QA, sentiment, NER — that Transformers now dominate but didn't invent.

Understanding this layer matters for a concrete reason, not just history: a lot of "why does the LLM tokenizer split words this way," "why do NER/parsing still show up as production pipeline stages even in an LLM-heavy stack," and "what does BLEU actually measure" only make sense with the classical grounding this section provides.

## What's in this section

- **[Classical NLP: Tokenization, POS Tagging, NER & Parsing](./classical-nlp.md)** — text normalization, part-of-speech tagging, named entity recognition, and syntactic parsing (dependency and constituency).
- **[Word Embeddings](./word-embeddings.md)** — word2vec (CBOW and skip-gram), GloVe, fastText, and why *contextual* embeddings (BERT-style, see [Attention & Transformers](../deep-learning/attention-transformers.md)) superseded these static ones.
- **[NLP Task Taxonomy](./nlp-task-taxonomy.md)** — sequence labeling, text classification, sentiment analysis, machine translation, summarization, and question answering, with the classical approach to each contrasted against the modern Transformer-based one.

See the [roadmap](./roadmap.md) for the full ordered path.
