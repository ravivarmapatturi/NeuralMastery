---
sidebar_position: 14
---

import LassoRegressionStudio from '@site/src/components/viz/LassoRegressionStudio';

# Lasso Regression Studio

The exact same synthetic dataset as the [Ridge Regression Studio](./ridge-regression-studio.md) — same correlated features, same λ range — but solved with real coordinate descent and soft-thresholding, matching [Lasso Regression, In Full Depth](../machine-learning/lasso-regression.md)'s own derivation and Python implementation exactly. The two Studios' regularization paths are meant to be compared side by side, not read in isolation.

<LassoRegressionStudio />

## What to Try

- Drag **λ** up from 0 and watch `x3` (genuinely irrelevant, true weight 0) snap to **exactly** zero at a fairly low λ — not asymptotically shrink like Ridge, but actually hit and stay at 0. The readout even labels it "(dropped)".
- Keep going and watch `x4` (weakly informative) drop too, while `x1` and `x2` (both strongly informative but correlated) survive much longer.
- Now open the [Ridge Regression Studio](./ridge-regression-studio.md) in another tab with the same Correlation setting. Ridge shrinks `x1` and `x2` together, smoothly, toward each other — Lasso instead tends to keep one and crush the other toward zero, arbitrarily favoring whichever one the data's noise happens to slightly favor. Regenerate the dataset (**New Dataset**) a few times and watch which of `x1`/`x2` "wins" change — that instability is exactly the caveat [Lasso, In Full Depth](../machine-learning/lasso-regression.md#when-to-use-lasso-over-ridge) calls out about correlated features.
- Watch the "features zeroed out" counter climb as λ increases — a live count of Lasso silently doing feature selection.

Back to [Visual Lab Overview](./overview.md).
