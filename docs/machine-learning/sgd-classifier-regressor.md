---
sidebar_position: 5.8
---

# SGD Classifier & Regressor, In Full Depth

Not a new algorithm — a **framing**. `SGDClassifier`/`SGDRegressor` (as named in libraries like scikit-learn) are the same linear model family covered throughout this section, unified by training them all with the same generic engine: [mini-batch stochastic gradient descent](../deep-learning/optimizers.md#gradient-descent-variants-by-batch-size).

## The Unifying Idea

Every linear model on this site — [Linear Regression](./linear-regression.md), [Ridge](./ridge-regression.md), [Lasso](./lasso-regression.md), [Logistic Regression](./logistic-regression.md), even linear [SVM](./support-vector-machines.md#the-optimization-problem) — has the same underlying shape: a linear function $\mathbf{w}^T\mathbf{x}+b$, paired with a loss function, optionally paired with a regularization penalty. What actually differs between them is just **which loss** and **which penalty** get plugged in:

| Model | Loss | Penalty |
|---|---|---|
| [Linear Regression](./linear-regression.md) | Squared error | None |
| [Ridge](./ridge-regression.md) | Squared error | L2 |
| [Lasso](./lasso-regression.md) | Squared error | L1 |
| [Logistic Regression](./logistic-regression.md) | Log loss | L2 (default) |
| Linear [SVM](./support-vector-machines.md) | Hinge loss | L2 |

An "SGD Classifier/Regressor" is exactly this table, implemented as **one generic training loop** — pick a loss, pick a penalty, and SGD optimizes whichever combination you chose. This is why the [gradient descent derivation from Linear Regression](./linear-regression.md#3-deriving-the-gradient-step-by-step) and the [gradient derivation from Logistic Regression](./logistic-regression.md#deriving-the-gradient) look structurally identical — they're literally the same training procedure with a different loss plugged in.

## Why This Framing Matters in Practice

- **Scales to huge datasets**: closed-form solutions (like the [normal equation](./linear-regression.md#5-the-closed-form-solution-normal-equation)) don't scale past a modest number of features, and even batch gradient descent requires holding meaningful chunks of data in memory. SGD updates on one example or mini-batch at a time (see [Optimizers — Gradient Descent Variants](../deep-learning/optimizers.md#gradient-descent-variants-by-batch-size)), so it scales to datasets far larger than memory, streaming through the data incrementally.
- **Online learning**: because SGD naturally processes data incrementally, an SGD-framed model can keep learning from new data arriving after deployment, without retraining from scratch — a genuinely different capability from the batch/closed-form methods elsewhere in this section.
- **One implementation, many models**: a library only needs to implement the SGD loop once, then expose loss/penalty as configuration — which is exactly why scikit-learn (and similar libraries) implement `SGDClassifier`/`SGDRegressor` as configurable wrappers rather than reimplementing near-identical training loops per model.

## Practical Considerations

- **Feature scaling matters** — like [KNN](./k-nearest-neighbors.md#distance-metrics), SGD-trained models converge much better when features are standardized first, since a badly-scaled feature can dominate the gradient and destabilize the learning rate choice (see [Calculus & Optimization — Learning Rate Schedules](../mathematics-for-ai/calculus-optimization.md#learning-rate-schedules--warmup)).
- **Learning rate schedule matters more here than for the closed-form versions** of these same models — see [LR Scheduling](../deep-learning/initialization-regularization-scheduling.md#learning-rate-scheduling) for the standard shapes (constant, invscaling, adaptive) libraries expose for SGD-trained linear models.
- **When to reach for it over the closed-form/batch version**: dataset too large for memory, need online/incremental learning, or you specifically want to swap losses/penalties without switching model classes entirely.

This completes the classical linear/margin/generative classifier family. Next: [Deep Learning](../deep-learning/roadmap.md) — where the same "linear function + loss + gradient descent" recipe gets stacked into many layers.
