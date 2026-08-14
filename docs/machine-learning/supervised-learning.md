---
sidebar_position: 4
---

# Supervised Learning

The workhorse of classical ML: learn a mapping from inputs to known outputs, then generalize to new inputs.

## Linear & Logistic Regression

**Linear regression** fits $\hat{y} = \mathbf{w}^T \mathbf{x} + b$, minimizing squared error. Assumes a linear relationship between features and target, and that errors are roughly normally distributed. Its simplicity is a feature — it's interpretable (each weight tells you the effect of that feature) and has a convex loss surface (see [Calculus & Optimization](../mathematics-for-ai/calculus-optimization.md)), so training is guaranteed to find the global optimum. See [Linear Regression, In Full Depth](./linear-regression.md) for the full gradient derivation, the closed-form normal equation, and a from-scratch implementation.

**Regularized variants** add a penalty on the weights to fight overfitting when features are correlated or numerous: [Ridge Regression](./ridge-regression.md) (L2 penalty, shrinks weights smoothly), [Lasso Regression](./lasso-regression.md) (L1 penalty, shrinks some weights to exactly zero — automatic feature selection), and [Elastic Net](./elastic-net.md) (a tunable blend of both, generally the safest default of the three).

**Logistic regression** applies a sigmoid to the linear output to produce a probability, and is trained with cross-entropy loss instead of squared error. Despite the name, it's a *classification* algorithm — one of the most-used baseline classifiers because it's fast, interpretable, and surprisingly hard to beat on many tabular problems. See [Logistic Regression, In Full Depth](./logistic-regression.md) for the full derivation, including why its gradient has the exact same shape as linear regression's despite a completely different loss function.

## Tree-Based Methods

**Decision trees** split the feature space recursively (e.g. "is age > 30?") to separate classes/values, producing axis-aligned rectangular decision regions. Easy to interpret, but prone to overfitting if grown too deep. See [Decision Trees, In Full Depth](./decision-tree.md) for the Gini/entropy split criteria, the full recursive algorithm, and why the boundary looks like a staircase.

**Random Forests** and **Extra Trees**: train many decision trees on bootstrapped samples of the data and random subsets of features, then average their predictions (**bagging**). Reduces variance dramatically compared to a single tree. See [Random Forest & Extra Trees](./random-forest.md) for the bias-variance math behind why averaging works, out-of-bag error, and feature importance.

**AdaBoost and Gradient Boosting**: build trees *sequentially*, where each new tree corrects the errors of the ensemble so far — trading Random Forest's variance-reduction for bias-reduction. See [Boosting](./boosting.md) for the full derivation, including why gradient boosting is literally gradient descent in function space.

**XGBoost, LightGBM, CatBoost**: the production-grade gradient boosting implementations that dominate tabular ML and Kaggle-style competitions. Almost always the strongest off-the-shelf method for structured/tabular data. See [XGBoost, LightGBM & CatBoost](./xgboost-lightgbm-catboost.md) for what actually differs between them (regularization, leaf-wise growth, categorical handling) and when to reach for which.

**Bagging vs. Boosting**: bagging trains models independently in parallel to reduce variance; boosting trains models sequentially, each focused on the previous ensemble's mistakes, to reduce bias. Stacking goes further — training a "meta-model" to combine the outputs of several different base models.

## Support Vector Machines

Finds the hyperplane that separates classes with the *maximum margin* — the widest possible gap between classes. Uses the "kernel trick" to handle non-linear boundaries by implicitly mapping data into a higher-dimensional space without ever computing that mapping directly. Historically dominant before deep learning for problems with limited data and a clear margin between classes.

## k-Nearest Neighbors

Predicts a new point's label by looking at the $k$ closest points in the training set (by some distance metric — often Euclidean or cosine, see [Linear Algebra](../mathematics-for-ai/linear-algebra.md)) and taking a majority vote (classification) or average (regression). No real training phase — all the cost is at prediction time, which is exactly why approximate nearest-neighbor search (covered in [Databases](../databases/roadmap.md)) matters at scale.

## Naive Bayes

Applies Bayes' theorem (see [Probability & Statistics](../mathematics-for-ai/probability-statistics.md)) with the "naive" assumption that features are conditionally independent given the class. That assumption is almost never literally true, yet Naive Bayes remains a strong, fast baseline for text classification and spam filtering.

Next: [Unsupervised Learning](./unsupervised-learning.md) — finding structure without labels.
