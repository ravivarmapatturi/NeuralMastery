---
sidebar_position: 5
---

# Unsupervised Learning

No labels — the goal is to discover structure that's already latent in the data.

## Clustering

**k-Means**: pick $k$ cluster centers, assign each point to its nearest center, recompute centers as the mean of assigned points, repeat until stable. Simple and fast, but requires choosing $k$ upfront and assumes roughly spherical, similarly-sized clusters.

**Hierarchical clustering**: builds a tree of clusters (a dendrogram) by either repeatedly merging the closest pairs (agglomerative) or splitting (divisive). Doesn't require choosing $k$ in advance — you cut the tree at whatever level makes sense.

**DBSCAN**: groups points that are densely packed together, marking sparse points as noise/outliers. Unlike k-Means, it can find arbitrarily shaped clusters and doesn't need $k$ specified — but it does need density parameters tuned.

## Dimensionality Reduction

**PCA (Principal Component Analysis)**: projects data onto the directions of maximum variance — the eigenvectors of the data's covariance matrix (see [Linear Algebra](../mathematics-for-ai/linear-algebra.md)). Fast, deterministic, and the standard first move for compressing features or visualizing high-dimensional data, though it only captures *linear* structure.

**t-SNE and UMAP**: nonlinear dimensionality reduction, mainly used for *visualizing* high-dimensional data (like embeddings) in 2D/3D. They preserve local neighborhood structure well, but the resulting axes aren't interpretable and distances between distant clusters shouldn't be over-interpreted.

## Anomaly Detection

Identifying points that don't fit the normal pattern of the data — fraud transactions, defective products, network intrusions. Approaches range from simple statistical thresholds (points far from the mean), to density-based methods (isolation forests, DBSCAN's noise points), to autoencoders (trained to reconstruct normal data well; anomalies reconstruct poorly).

Next: [Model Evaluation & Metrics](./model-evaluation-metrics.md) — how to know whether any of these models are actually good.
