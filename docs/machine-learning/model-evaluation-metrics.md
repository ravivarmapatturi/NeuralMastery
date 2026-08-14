---
sidebar_position: 6
---

# Model Evaluation & Metrics

A model is only as good as the way you measure it. Picking the wrong metric is one of the most common ways ML projects quietly fail.

## Bias-Variance Tradeoff

- **Bias**: error from overly simplistic assumptions — the model *underfits*, missing real patterns in the data.
- **Variance**: error from being overly sensitive to the specific training data — the model *overfits*, memorizing noise instead of learning generalizable patterns.
- Total error decomposes roughly as $\text{Bias}^2 + \text{Variance} + \text{Irreducible Error}$. Reducing one often increases the other — a simpler model has more bias but less variance, and vice versa. Model capacity, regularization strength, and amount of training data are the main levers.

## Regularization

Techniques that intentionally constrain a model to reduce variance/overfitting:

- **L1 (Lasso)**: adds $\lambda \sum |w_i|$ to the loss — pushes weights toward exactly zero, giving automatic feature selection.
- **L2 (Ridge)**: adds $\lambda \sum w_i^2$ — shrinks weights smoothly without forcing them to zero. Mathematically equivalent to MAP estimation with a Gaussian prior (see [Probability & Statistics](../mathematics-for-ai/probability-statistics.md)).
- **Dropout** (deep learning): randomly zeroes out neurons during training, forcing the network to not rely too heavily on any single pathway.
- **Early stopping**: stop training once validation performance stops improving, before the model starts memorizing training noise.

## Classification Metrics

- **Accuracy**: fraction correct — misleading on imbalanced data (a 99%-negative dataset gets 99% accuracy by always predicting negative).
- **Precision**: of everything predicted positive, how much was actually positive. $\text{Precision} = \frac{TP}{TP + FP}$
- **Recall**: of everything actually positive, how much did the model catch. $\text{Recall} = \frac{TP}{TP + FN}$
- **F1 score**: harmonic mean of precision and recall — a single number balancing both.
- **ROC-AUC**: area under the true-positive-rate vs. false-positive-rate curve across all thresholds — measures ranking quality independent of a specific threshold.
- **PR-AUC**: like ROC-AUC but using precision/recall — more informative than ROC-AUC on heavily imbalanced datasets.

**Choosing precision vs. recall**: depends entirely on the cost of each error type. A cancer-screening model should favor recall (missing a real case is worse than a false alarm); a spam filter should favor precision (blocking a real email is worse than letting one spam message through).

## Regression Metrics

- **MSE (Mean Squared Error)**: penalizes large errors disproportionately (squared term) — sensitive to outliers.
- **MAE (Mean Absolute Error)**: penalizes all errors linearly — more robust to outliers.
- **R²**: fraction of variance in the target explained by the model, from 0 (no better than predicting the mean) to 1 (perfect fit).

## Calibration

A model can rank examples correctly (good AUC) while its predicted probabilities are systematically off (e.g. it says "70% confident" but is only right 50% of the time at that confidence level). **Calibration** measures and corrects this — critical whenever downstream decisions depend on the actual probability value, not just the ranking (e.g. risk-based pricing).

## Statistical Significance of Improvements

Before shipping "Model B beats Model A by 0.3%," check whether that difference is statistically significant (see [Probability & Statistics](../mathematics-for-ai/probability-statistics.md)) or just noise from the particular test split / random seed. This is exactly what A/B testing in production is designed to answer rigorously.

## Common Problems & Their State-of-the-Art Solutions

- **Class imbalance** → resampling (SMOTE), class weighting, focal loss (down-weights easy examples so the model focuses on hard/minority-class ones)
- **Overfitting on small data** → stronger regularization, data augmentation, transfer learning from a model pretrained on related data
- **Concept drift in production** (the real-world data distribution shifts over time) → continuous monitoring dashboards, scheduled retraining, online learning
- **Curse of dimensionality** (too many features relative to data volume, distances become meaningless) → feature selection, PCA, stronger regularization
- **Slow training on huge tabular datasets** → gradient boosting libraries built for speed (XGBoost, LightGBM), distributed training frameworks
- **Explainability** ("why did the model predict this?") → SHAP values (game-theoretic feature attribution), LIME (local approximations), built-in feature importance from tree models

Machine Learning section complete. Next: [Deep Learning](../deep-learning/roadmap.md) — when classical algorithms stop being enough.
