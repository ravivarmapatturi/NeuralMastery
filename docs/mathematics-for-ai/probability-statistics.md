---
sidebar_position: 5
---

# Probability & Statistics for AI

Models don't produce certainties — they produce probability distributions. Understanding probability is understanding what a model's output actually means, and statistics is how you tell whether a model's improvement is real or just noise.

## Random Variables and Distributions

A random variable is a quantity whose value depends on chance. Its **distribution** describes how likely each possible value is.

- **Bernoulli**: a single yes/no outcome (e.g. "is this email spam?") — the distribution behind binary classification.
- **Binomial**: the number of successes in $n$ independent Bernoulli trials.
- **Gaussian (Normal)**: the classic bell curve, defined by mean $\mu$ and variance $\sigma^2$. Appears everywhere — weight initialization, noise modeling, the assumed error distribution in linear regression.
- **Categorical**: a generalization of Bernoulli to more than two outcomes — this is exactly what an LLM's output layer produces: a probability distribution over every possible next token.

## Expectation, Variance, Covariance

- **Expectation** $E[X]$: the long-run average value of a random variable — the "center of mass" of its distribution.
- **Variance** $\text{Var}(X) = E[(X - E[X])^2]$: how spread out the values are.
- **Covariance** $\text{Cov}(X, Y)$: whether two variables move together (positive), oppositely (negative), or independently (near zero).
- **Correlation**: covariance normalized to $[-1, 1]$, making it comparable across different variables' scales.

Why it matters: the bias-variance tradeoff (see [Machine Learning](../machine-learning/roadmap.md)) is *literally* a statement about the variance of a model's predictions across different training sets.

## Bayes' Theorem

$$P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}$$

Lets you update a belief ($P(A)$, the *prior*) given new evidence ($B$) to get an updated belief ($P(A \mid B)$, the *posterior*). This single equation underlies Naive Bayes classifiers, Bayesian optimization (used for hyperparameter tuning), and the conceptual framing of how RAG systems should ideally combine a model's prior knowledge with retrieved evidence.

## MLE vs MAP

- **Maximum Likelihood Estimation (MLE)**: pick the model parameters that make the observed data most probable. This is what "minimizing cross-entropy loss" actually is under the hood — cross-entropy loss minimization *is* MLE for a categorical distribution.
- **Maximum A Posteriori (MAP)**: like MLE, but also weighs in a prior belief about what parameters are reasonable. Adding L2 regularization to a loss function is mathematically equivalent to doing MAP estimation with a Gaussian prior on the weights.

## Central Limit Theorem

The average of a large number of independent random variables tends toward a Gaussian distribution, regardless of the original variables' distribution. This is why so much of statistics gets to assume normality, and why metrics averaged over large evaluation sets behave predictably even when individual examples are noisy.

## Hypothesis Testing & Significance

- **Null hypothesis**: the "nothing changed" baseline assumption.
- **p-value**: the probability of seeing a result at least this extreme *if the null hypothesis were true*. A small p-value (conventionally < 0.05) suggests the result probably isn't just noise.
- **Confidence intervals**: a range that's likely to contain the true value, given the observed data.
- **A/B testing**: the practical application — before shipping a new model to 100% of users, you run it against a control group and use hypothesis testing to confirm the improvement is real, not random variation. This is one of the most common day-to-day uses of statistics in an ML engineer's job.

## Entropy, Cross-Entropy, and KL Divergence

- **Entropy** $H(P) = -\sum_x P(x) \log P(x)$: measures the inherent uncertainty in a distribution. A fair coin has higher entropy than a biased one.
- **Cross-entropy** $H(P, Q) = -\sum_x P(x) \log Q(x)$: measures how well a predicted distribution $Q$ matches the true distribution $P$. **This is the loss function used to train virtually every classifier and every LLM** (next-token prediction is a giant cross-entropy minimization over the vocabulary distribution).
- **KL divergence** $D_{KL}(P \| Q) = H(P, Q) - H(P)$: measures how much information is lost when $Q$ is used to approximate $P$. Shows up in variational autoencoders, in RLHF (constraining the fine-tuned policy from drifting too far from the base model), and in DPO's loss formulation.

## Where this shows up in the rest of the curriculum

| Concept | Used in |
|---|---|
| Cross-entropy | Loss function for classifiers and every LLM |
| Bayes' theorem | Naive Bayes, Bayesian hyperparameter search |
| MLE / MAP | Why cross-entropy loss = MLE; why L2 regularization = MAP |
| KL divergence | RLHF/DPO constraints, VAEs |
| Hypothesis testing | A/B testing new models in production |

Next: [Algorithms & Data Structures](./algorithms-data-structures.md) — the CS fundamentals that show up in every ML engineering interview alongside the math.
