---
sidebar_position: 4
---

# Calculus & Optimization for AI

Linear algebra tells you how data flows through a model. Calculus tells you how to *change the model* so it gets better. Every training run, at its core, is an optimization loop built entirely on the ideas in this page.

## Derivatives and Gradients

A derivative measures how much a function's output changes when you nudge its input: $\dfrac{df}{dx}$. In ML, our functions take many inputs (millions of weights), so we use the **gradient** — a vector of partial derivatives, one per parameter: $\nabla f = \left[\dfrac{\partial f}{\partial w_1}, \dfrac{\partial f}{\partial w_2}, \dots\right]$.

**The key idea**: the gradient points in the direction of *steepest increase* of the loss function. So to reduce the loss, you step in the *opposite* direction of the gradient. That single sentence is the entire idea behind training every neural network that exists.

## The Chain Rule → Backpropagation

If $y = f(g(x))$, then $\dfrac{dy}{dx} = \dfrac{dy}{dg} \cdot \dfrac{dg}{dx}$.

A neural network is a chain of functions (layer 1 → layer 2 → ... → loss). Backpropagation is nothing more than applying the chain rule repeatedly, from the loss backward to each weight, to compute how much each individual weight contributed to the error. This is why it's called *backward* propagation — you compute the output forward, then walk the chain rule backward.

**Worked shape**: for a 2-layer network $L = \text{loss}(f_2(f_1(x, W_1), W_2))$, the gradient with respect to $W_1$ requires multiplying the local gradients all the way from the loss back through $f_2$ to $f_1$ — exactly the chain rule, applied mechanically by every deep learning framework's autograd engine.

## Convexity

A function is **convex** if a line segment between any two points on its graph never dips below the graph itself — it has a single global minimum, no false valleys. Linear regression's loss (MSE) is convex, which is why it can be solved exactly.

Neural network loss surfaces are **non-convex** — full of local minima and saddle points. This is why deep learning relies on iterative, gradient-based search rather than a closed-form solution, and why techniques like good initialization, momentum, and learning rate schedules matter so much: they're all ways of navigating a bumpy, high-dimensional surface without getting stuck.

## Gradient Descent and Its Variants

**Batch gradient descent**: compute the gradient using the *entire* dataset, then take one step. Accurate but painfully slow for large datasets.

**Stochastic Gradient Descent (SGD)**: compute the gradient using a *single* example, then step. Fast and noisy — the noise actually helps escape shallow local minima.

**Mini-batch SGD**: the practical middle ground — compute the gradient over a small batch (e.g. 32-512 examples). This is what "batch size" refers to in every training run you'll configure.

**Update rule**: $\theta \leftarrow \theta - \eta \nabla L(\theta)$, where $\eta$ is the learning rate — the single most important hyperparameter to get right. Too large and training diverges; too small and training crawls.

## Adaptive Optimizers

Plain SGD treats every parameter the same. Modern optimizers adapt the step size per parameter:

- **Momentum**: accumulates a running average of past gradients, so the optimizer keeps moving in a consistent direction and dampens oscillation — like a ball rolling downhill picking up speed.
- **AdaGrad**: scales down the learning rate for parameters that get frequent large updates — good for sparse features, but its accumulated sum only grows, eventually shrinking the learning rate to near zero.
- **RMSProp**: fixes AdaGrad's decay problem by using a *moving* average of squared gradients instead of a running sum.
- **Adam**: combines momentum (first moment) and RMSProp-style adaptive scaling (second moment). The default choice for training almost every modern neural network, including LLMs.

## Learning Rate Schedules & Warmup

- **Warmup**: start with a tiny learning rate and ramp up over the first several hundred/thousand steps. Prevents early, noisy gradients (before the model has learned anything sensible) from causing instability.
- **Decay schedules** (cosine, linear, step): reduce the learning rate over training so the model can settle into a sharper minimum near the end, rather than bouncing around it.
- **Gradient clipping**: cap the gradient's magnitude before applying it, to prevent a single bad batch from blowing up the weights — essential when training large Transformers.

## Lagrange Multipliers

Used when optimizing a function subject to a constraint, e.g. "minimize $f(x)$ such that $g(x) = 0$." You form $\mathcal{L}(x, \lambda) = f(x) - \lambda g(x)$ and optimize jointly over $x$ and $\lambda$. This is the mathematical machinery behind Support Vector Machines (maximizing the margin subject to correct classification) and shows up again in constrained RL formulations.

## Where this shows up in the rest of the curriculum

| Concept | Used in |
|---|---|
| Gradient descent | Training every neural network and LLM |
| Chain rule / backprop | Every framework's `.backward()` call |
| Adam optimizer | Default optimizer for Transformers, LLMs |
| Convexity | Why classical ML (SVM, logistic regression) has guarantees deep learning doesn't |
| Lagrange multipliers | SVM margin maximization, constrained RL |

Next: [Probability & Statistics](./probability-statistics.md) — the math of uncertainty, which underlies loss functions, evaluation, and how LLMs generate text token by token.
