---
sidebar_position: 4
---

import NeuralNetworkPlayground from '@site/src/components/viz/NeuralNetworkPlayground';

# Neural Network Playground

A real neural network, forward and backward pass hand-written (no TensorFlow.js, no autograd library — the same from-scratch philosophy as [Build From Scratch — A Neural Network](../build-from-scratch/the-build-list.md#3-a-neural-network)), training live in your browser on whichever toy dataset and architecture you choose.

<NeuralNetworkPlayground />

## What to Try

- Start with **Blobs** — linearly separable, even a single hidden layer solves it almost instantly.
- Switch to **XOR** with 1 hidden layer — watch it fail to separate the classes no matter how long you train. This is the textbook argument for *why depth matters* ([Neural Network Fundamentals](../deep-learning/neural-network-fundamentals.md)), made concrete instead of asserted. Add a second hidden layer and watch it succeed.
- Compare **ReLU** vs. **tanh** on **Circles** and **Moons** — notice which converges faster, and how the decision boundary's *shape* differs (ReLU's piecewise-linear boundary vs. tanh's smoother curves).
- Push the learning rate slider high and watch training destabilize — the same "too large a learning rate" failure mode from the [Gradient Descent Explorer](./gradient-descent-explorer.md), one layer up in a real (if tiny) network.
- Hit **Reset Weights** on the same configuration a few times — different random initializations can converge to visibly different decision boundaries, direct evidence that initialization (see [Weight Initialization](../deep-learning/neural-network-fundamentals.md#weight-initialization)) actually matters.

Back to [Visual Lab Overview](./overview.md).
