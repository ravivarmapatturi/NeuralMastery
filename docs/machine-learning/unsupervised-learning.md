---
sidebar_position: 5
---

# Unsupervised Learning

No labels — the goal is to discover structure that's already latent in the data.

## Clustering

**k-Means**: pick $k$ cluster centers, assign each point to its nearest center, recompute centers as the mean of assigned points, repeat until stable. Simple and fast, but requires choosing $k$ upfront and assumes roughly spherical, similarly-sized clusters. See [K-Means & Hierarchical Clustering, In Full Depth](./kmeans-hierarchical-clustering.md) for what K-Means is actually optimizing (it's the unsupervised analog of squared-error regression) and the elbow method for choosing $k$.

**Hierarchical clustering**: builds a tree of clusters (a dendrogram) by either repeatedly merging the closest pairs (agglomerative) or splitting (divisive). Doesn't require choosing $k$ in advance — you cut the tree at whatever level makes sense. Covered in the same page above, including the four linkage criteria (single/complete/average/Ward) that decide how "distance between clusters" is measured.

**DBSCAN and HDBSCAN**: group points that are densely packed together, marking sparse points as noise/outliers. Unlike k-Means, they can find arbitrarily shaped clusters and don't need $k$ specified — but DBSCAN does need density parameters tuned, and HDBSCAN removes even that. See [DBSCAN & HDBSCAN, In Full Depth](./dbscan-hdbscan.md) for the core/border/noise point definitions and why density-based clustering handles non-convex shapes natively.

**Gaussian Mixture Models and Spectral Clustering**: GMM gives soft, probabilistic cluster membership instead of K-Means' hard assignment (it's essentially unsupervised QDA); Spectral Clustering handles non-convex shapes via graph eigenvectors instead of density. See [GMM & Spectral Clustering, In Full Depth](./gmm-spectral-clustering.md) for the Expectation-Maximization derivation and a full four-way comparison table across all the clustering methods on this page.

## Dimensionality Reduction

**PCA (Principal Component Analysis)**: projects data onto the directions of maximum variance — the eigenvectors of the data's covariance matrix (see [Linear Algebra](../mathematics-for-ai/linear-algebra.md)). Fast, deterministic, and the standard first move for compressing features or visualizing high-dimensional data, though it only captures *linear* structure. **Kernel PCA** extends it to nonlinear structure via the same kernel trick as SVM; **Truncated SVD** skips mean-centering to handle sparse data like text. See [PCA, Kernel PCA & Truncated SVD, In Full Depth](./pca-svd.md) for the eigenvector derivation, scree plots for choosing how many components to keep, and how PCA connects directly to SVD.

**ICA (Independent Component Analysis)**: separates mixed signals into statistically independent sources — the "cocktail party problem." A fundamentally different goal from PCA's variance-maximization. See [ICA, t-SNE & UMAP, In Full Depth](./ica-tsne-umap.md) for the non-Gaussianity trick that makes it work.

**t-SNE and UMAP**: nonlinear dimensionality reduction, mainly used for *visualizing* high-dimensional data (like embeddings) in 2D/3D. They preserve local neighborhood structure well, but the resulting axes aren't interpretable and distances between distant clusters shouldn't be over-interpreted. See [ICA, t-SNE & UMAP, In Full Depth](./ica-tsne-umap.md#t-sne-t-distributed-stochastic-neighbor-embedding) for exactly what these plots can and can't be trusted to show.

## Anomaly Detection

Identifying points that don't fit the normal pattern of the data — fraud transactions, defective products, network intrusions. Approaches range from simple statistical thresholds (points far from the mean), to density-based methods (isolation forests, DBSCAN's noise points), to autoencoders (trained to reconstruct normal data well; anomalies reconstruct poorly).

Next: [Model Evaluation & Metrics](./model-evaluation-metrics.md) — how to know whether any of these models are actually good.
