---
sidebar_position: 4
---

# Supervised Learning

The workhorse of classical ML: learn a mapping from inputs to known outputs, then generalize to new inputs.

## Linear & Logistic Regression

**Linear regression** fits $\hat{y} = \mathbf{w}^T \mathbf{x} + b$, minimizing squared error. Assumes a linear relationship between features and target, and that errors are roughly normally distributed. Its simplicity is a feature — it's interpretable (each weight tells you the effect of that feature) and has a convex loss surface (see [Calculus & Optimization](../mathematics-for-ai/calculus-optimization.md)), so training is guaranteed to find the global optimum. See [Linear Regression, In Full Depth](./linear-regression.md) for the full gradient derivation, the closed-form normal equation, and a from-scratch implementation.

**Logistic regression** applies a sigmoid to the linear output to produce a probability, and is trained with cross-entropy loss instead of squared error. Despite the name, it's a *classification* algorithm — one of the most-used baseline classifiers because it's fast, interpretable, and surprisingly hard to beat on many tabular problems.

## Tree-Based Methods

**Decision trees** split the feature space recursively (e.g. "is age > 30?") to separate classes/values. Easy to interpret, but prone to overfitting if grown too deep.

**Random Forests**: train many decision trees on bootstrapped samples of the data and random subsets of features, then average their predictions (**bagging**). Reduces variance dramatically compared to a single tree.

**Gradient Boosting (XGBoost, LightGBM)**: build trees *sequentially*, where each new tree corrects the errors of the ensemble so far. Almost always the strongest off-the-shelf method for structured/tabular data — dominant on Kaggle-style competitions and widely used in industry for exactly that reason.

**Bagging vs. Boosting**: bagging trains models independently in parallel to reduce variance; boosting trains models sequentially, each focused on the previous ensemble's mistakes, to reduce bias. Stacking goes further — training a "meta-model" to combine the outputs of several different base models.

## Support Vector Machines

Finds the hyperplane that separates classes with the *maximum margin* — the widest possible gap between classes. Uses the "kernel trick" to handle non-linear boundaries by implicitly mapping data into a higher-dimensional space without ever computing that mapping directly. Historically dominant before deep learning for problems with limited data and a clear margin between classes.

## k-Nearest Neighbors

Predicts a new point's label by looking at the $k$ closest points in the training set (by some distance metric — often Euclidean or cosine, see [Linear Algebra](../mathematics-for-ai/linear-algebra.md)) and taking a majority vote (classification) or average (regression). No real training phase — all the cost is at prediction time, which is exactly why approximate nearest-neighbor search (covered in [Databases](../databases/roadmap.md)) matters at scale.

## Naive Bayes

Applies Bayes' theorem (see [Probability & Statistics](../mathematics-for-ai/probability-statistics.md)) with the "naive" assumption that features are conditionally independent given the class. That assumption is almost never literally true, yet Naive Bayes remains a strong, fast baseline for text classification and spam filtering.

Next: [Unsupervised Learning](./unsupervised-learning.md) — finding structure without labels.
