---
sidebar_position: 11
---

import LinearRegressionStudio from '@site/src/components/viz/LinearRegressionStudio';

# Linear Regression Studio

A real, noisy "study hours vs. exam score" dataset with two modes: drag the line yourself and watch MSE respond, or hand control to real batch gradient descent and watch it converge (or diverge) live — the exact formulas from [Linear Regression, In Full Depth](../machine-learning/linear-regression.md), not a mockup.

<LinearRegressionStudio />

## What to Try

- In **Fit It Yourself**, get the MSE as low as you can by hand, then flip on the **Outlier** toggle and watch it jump — a direct, visceral answer to why squared error punishes big misses so much harder than small ones.
- Turn the **Noise** slider up and notice how much harder it gets to find a clearly "best" line by eye — real data rarely fits perfectly, and that's exactly why a systematic optimization procedure (gradient descent) beats guess-and-check.
- In **Gradient Descent Lab**, start at the default learning rate and hit **Play** — watch the two panels move in sync: the line settling into the data on the left, the point sliding down the real MSE surface on the right.
- Push the learning rate slider toward its max and watch it diverge instead of converge — the step log will show `w` and `b` exploding. That's not a bug; it's the exact failure mode [Optimizers, In Full Depth](../deep-learning/optimizers.md) warns about, reproduced on real data.
- Compare the shape of the loss landscape here to the synthetic bowl in the [Gradient Descent Explorer](./gradient-descent-explorer.md) — both are genuinely quadratic in their parameters, which is exactly why linear regression's cost surface has no false local minima to get stuck in.

Back to [Visual Lab Overview](./overview.md).
