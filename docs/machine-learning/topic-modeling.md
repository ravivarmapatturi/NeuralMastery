---
sidebar_position: 6.8
---

# Topic Modeling: LDA & BERTopic, In Full Depth

The last unsupervised family on this site, specifically for text: discovering the themes running through a collection of documents, with no labels telling you what those themes are in advance.

:::info Naming collision, resolved
There are **two completely different "LDA"s** on this site. [Linear Discriminant Analysis](./naive-bayes-lda-qda.md#lda-linear-discriminant-analysis) is a *supervised classifier* that models each class as a Gaussian. **Latent Dirichlet Allocation** — this page — is an *unsupervised topic model* for text, and shares nothing with the other LDA except the acronym. Context always disambiguates which one is meant, but it's worth internalizing the split explicitly the first time you see both.
:::

## Latent Dirichlet Allocation (LDA)

**The generative story LDA assumes**: every document is a mixture of a handful of topics, and every topic is a probability distribution over words. To "generate" a document under this model: pick a mixture of topics for it (e.g. 70% "finance," 30% "politics"), then for each word slot, pick a topic according to that mixture, and pick a word according to that topic's word distribution.

LDA works backward from this story: given only the observed documents (no topic labels), infer the most likely topic-word distributions and document-topic mixtures that could have generated them. "Dirichlet" refers to the specific probability distribution (a distribution *over* distributions) used as a prior on both the topic mixtures and the word distributions — a smooth, computationally convenient way of encoding "most documents focus on relatively few topics, most topics have relatively few dominant words" before seeing any data.

**What a "topic" actually is**: not a labeled category — just a weighted list of words that tend to co-occur across the corpus:

![Three LDA topics, each just a ranked list of words with weights — LDA discovers these purely from word co-occurrence, with no human-provided labels](./img/topic-words.png)

The words "Sports," "Finance," "Health" in the chart above are labels a *human* would assign after looking at each topic's top words — LDA itself only ever outputs the weighted word lists; it has no concept of what to call them.

**Training**: typically via Gibbs sampling or variational inference — genuinely different machinery from every gradient-descent-trained model elsewhere on this site, since LDA is a fully Bayesian generative model, not a differentiable one being directly optimized (see [Probability & Statistics — Bayes' Theorem](../mathematics-for-ai/probability-statistics.md#bayes-theorem) for the conceptual foundation).

**Preprocessing matters enormously**: LDA works on a bag-of-words representation (word order discarded — see [Foundation Model Internals](../llms-genai/foundation-model-internals.md#tokenization) for the tokenization step this requires), and typically needs stopword removal and stemming/lemmatization beforehand — raw text fed in directly produces poor, noisy topics dominated by common function words.

## BERTopic

A modern alternative built on an entirely different foundation: instead of LDA's bag-of-words generative model, BERTopic uses actual sentence/document **embeddings** (see [Foundation Model Internals](../llms-genai/foundation-model-internals.md#embeddings)) from a pretrained transformer, then clusters those embeddings.

**The pipeline**:
1. Embed every document with a pretrained embedding model (capturing semantic meaning, not just word co-occurrence counts).
2. Reduce dimensionality (typically **UMAP** — see [ICA, t-SNE & UMAP](./ica-tsne-umap.md#umap-uniform-manifold-approximation-and-projection)) since embeddings are high-dimensional and raw clustering struggles there (the [curse of dimensionality](./k-nearest-neighbors.md#the-curse-of-dimensionality) again).
3. Cluster the reduced embeddings (typically **HDBSCAN** — see [DBSCAN & HDBSCAN](./dbscan-hdbscan.md#hdbscan-hierarchical-dbscan)), where each resulting cluster *is* a topic.
4. Extract representative words per cluster/topic using a TF-IDF-style scoring applied within each cluster, to produce the same kind of human-readable word list LDA produces.

**Why BERTopic often outperforms LDA in practice**: because it clusters on *semantic* embeddings rather than raw word co-occurrence, it correctly groups documents using synonyms or paraphrases together (e.g. "physician" and "doctor") — something bag-of-words LDA structurally cannot do, since it only ever sees which exact tokens co-occur, never their meaning.

## LDA vs. BERTopic

| | LDA | BERTopic |
|---|---|---|
| Text representation | Bag-of-words | Pretrained embeddings |
| Captures synonyms/semantics | No | Yes |
| Interpretability | High (direct word-topic weights) | Moderate (word extraction is a post-hoc step) |
| Compute cost | Low | Higher (needs an embedding model + UMAP + HDBSCAN) |
| Number of topics | Must specify upfront | Discovered automatically (via HDBSCAN, like [DBSCAN's noise-aware clustering](./dbscan-hdbscan.md)) |

## A Note on Standalone SVD

**SVD** as a general-purpose matrix factorization tool is covered in depth in [Linear Algebra](../mathematics-for-ai/linear-algebra.md#singular-value-decomposition-svd) (the underlying math) and [PCA, Kernel PCA & Truncated SVD](./pca-svd.md#truncated-svd) (its application to sparse/text data, sometimes called LSA). There's no separate treatment needed here — it's the same decomposition, just applied earlier in this curriculum to dimensionality reduction rather than topic discovery specifically.

This completes the entire Unsupervised Learning family. Back to [Unsupervised Learning](./unsupervised-learning.md) for the full overview, or [Model Evaluation & Metrics](./model-evaluation-metrics.md) to continue the Machine Learning roadmap.
