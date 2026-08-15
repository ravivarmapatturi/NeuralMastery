---
sidebar_position: 10
---

import EmbeddingSpaceExplorer from '@site/src/components/viz/EmbeddingSpaceExplorer';

# Embedding Space Explorer

A small, hand-built demo vocabulary (48 words across 8 categories) plotted in 2D via a real, from-scratch [PCA](../mathematics-for-ai/linear-algebra.md#eigenvalues-and-eigenvectors) projection (power iteration + deflation on the covariance matrix — the same eigenvector math [Linear Algebra](../mathematics-for-ai/linear-algebra.md) covers, not a canned library call). There's no trained [word embedding](../nlp/word-embeddings.md) model running in your browser — the vectors are structured by hand — but every computation on top of them (cosine similarity, nearest-neighbor lookup, vector-arithmetic analogy) is real.

<EmbeddingSpaceExplorer />

## What to Try

- Click any point and watch the "Nearest to..." panel fill in with the words closest to it by real cosine similarity — words in the same category cluster tightly because their vectors share a dominant direction, exactly the geometric intuition behind [why embeddings work at all](../nlp/word-embeddings.md#the-core-idea-the-distributional-hypothesis).
- Run the default analogy — king − man + woman — and watch "queen" come out on top, [word2vec's most famous empirical result](../nlp/word-embeddings.md#word2vec), reproduced live from real vector arithmetic instead of quoted as a fact.
- Try other analogies from the vocabulary (father − man + woman, duke − man + woman) and see which ones the geometry actually supports and which ones break down — a concrete way to feel the limits of a linear analogy structure, not just its successes.
- Notice the categories form visually distinct clusters in the 2D projection even though PCA never saw the category labels — it only saw the raw vectors, and the clustering emerged from real variance in the data.

Back to [Visual Lab Overview](./overview.md).
