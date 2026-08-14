---
sidebar_position: 3
---

# Linear Algebra for AI

Every number an AI model works with — a pixel, a word, a weight — is stored and manipulated as a vector or a matrix. Linear algebra is the language that makes that manipulation precise.

## Vectors

A vector is an ordered list of numbers, e.g. $\mathbf{v} = [2, -1, 3]$. In AI, a vector usually represents *something's position in a space of features*: a word's embedding, an image's pixel values flattened out, a user's preference profile.

**Dot product**: $\mathbf{a} \cdot \mathbf{b} = \sum_i a_i b_i$. Measures how much two vectors point in the same direction. If the dot product is large and positive, the vectors are aligned; if it's zero, they're orthogonal (unrelated); if negative, they point in opposite directions.

**Norm (length)**: $\|\mathbf{v}\|_2 = \sqrt{\sum_i v_i^2}$ (the Euclidean/L2 norm). Used constantly for regularization (penalizing large weights) and for normalizing vectors to unit length.

**Cosine similarity**: $\cos(\theta) = \dfrac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}$. This is *the* similarity metric for embeddings — it measures direction, ignoring magnitude, which is exactly what you want when comparing two text or image embeddings for semantic similarity (this is the metric vector databases use for nearest-neighbor search).

## Matrices

A matrix is a grid of numbers — think of it as a function that transforms vectors. A neural network layer is nothing more than a matrix multiplication followed by a nonlinearity: $\mathbf{y} = W\mathbf{x} + \mathbf{b}$.

**Matrix multiplication**: combining two matrices $A$ (shape $m \times n$) and $B$ (shape $n \times p$) produces $C$ (shape $m \times p$), where each entry $C_{ij}$ is the dot product of row $i$ of $A$ and column $j$ of $B$. This is the single most executed operation on every GPU running AI workloads today.

**Transpose** ($A^T$): flips rows and columns. Shows up constantly in backpropagation (gradients flow backward through the transposed weight matrix) and in attention (`Q · Kᵀ`).

**Inverse** ($A^{-1}$): the matrix that "undoes" $A$, so $A A^{-1} = I$. Only exists for square, full-rank matrices. Rarely computed directly in deep learning (too expensive/unstable) but essential to understand conceptually — e.g. in solving linear regression's closed-form solution.

## Rank, Independence, and Span

- **Linear independence**: a set of vectors where none can be written as a combination of the others.
- **Span**: all the vectors you can reach by combining a given set of vectors.
- **Rank**: the number of linearly independent rows/columns in a matrix — effectively, how much "real" information the matrix carries. A low-rank matrix has redundant rows/columns.

Why this matters: LoRA (Low-Rank Adaptation), one of the most widely used fine-tuning techniques for LLMs, works precisely because weight *updates* during fine-tuning tend to have low rank — so you can approximate them with two small matrices instead of one huge one.

## Eigenvalues and Eigenvectors

For a square matrix $A$, an eigenvector $\mathbf{v}$ is a vector whose direction $A$ doesn't change — it only gets scaled: $A\mathbf{v} = \lambda \mathbf{v}$, where $\lambda$ is the eigenvalue.

**Intuition**: eigenvectors are the "natural axes" of a transformation — the directions where the matrix acts like simple scaling instead of full rotation/shearing. This is the basis of PCA (Principal Component Analysis): the eigenvectors of a dataset's covariance matrix are the directions of maximum variance in the data.

## Singular Value Decomposition (SVD)

Any matrix $A$ (even non-square) can be decomposed as $A = U \Sigma V^T$, where $U$ and $V$ are orthogonal matrices and $\Sigma$ is diagonal with non-negative values (the singular values), sorted largest to smallest.

**Why it matters**: SVD is the general-purpose tool behind dimensionality reduction, recommender systems (matrix factorization: decomposing a user-item ratings matrix), noise reduction, and it underlies PCA. If you understand SVD, you understand why "compressing" a matrix by keeping only the top-$k$ singular values loses the *least* information possible for that compression level — this is exactly the intuition behind low-rank approximations used in efficient LLM fine-tuning and model compression.

## Positive Semi-Definite Matrices

A symmetric matrix $A$ is positive semi-definite (PSD) if $\mathbf{x}^T A \mathbf{x} \geq 0$ for every vector $\mathbf{x}$. Covariance matrices are always PSD. This property guarantees that optimization problems built on them (like many kernel methods, and second-order optimization) behave predictably — no "negative curvature" surprises.

## Where this shows up in the rest of the curriculum

| Concept | Used in |
|---|---|
| Dot product / cosine similarity | Embeddings, vector search, attention scores |
| Matrix multiplication | Every neural network layer |
| Eigenvectors | PCA, spectral clustering |
| SVD / low rank | LoRA fine-tuning, recommender systems, compression |
| Transpose | Backpropagation, attention (`Qᵀ`, `Kᵀ`) |

Next: [Calculus & Optimization](./calculus-optimization.md) — how models actually *learn* by following gradients through this linear-algebra machinery.
