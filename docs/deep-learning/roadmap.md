---
sidebar_position: 2
---

# Deep Learning — Roadmap

Neural networks from first principles up to the architectures that dominate modern AI.

## 1. Neural Network Fundamentals
- [ ] The perceptron, multi-layer perceptrons
- [ ] Activation functions: sigmoid, tanh, ReLU, GELU, SwiGLU
- [ ] Forward pass and backpropagation (the calculus, worked by hand once)
- [ ] Weight initialization (Xavier, He)
- [ ] Batch, mini-batch, and stochastic gradient descent

## 2. Training Deep Networks
- [ ] Loss functions: cross-entropy, MSE, contrastive/triplet loss
- [ ] Batch Normalization vs Layer Normalization vs RMSNorm
- [ ] Dropout and other regularization for deep nets
- [ ] Vanishing / exploding gradients
- [ ] Residual (skip) connections — why they enable very deep networks
- [ ] Learning rate schedules, warmup, gradient clipping

## 3. Convolutional Neural Networks (CNNs)
- [ ] Convolution, pooling, receptive fields
- [ ] Classic architectures: LeNet → AlexNet → ResNet → EfficientNet
- [ ] Applications: image classification, object detection, segmentation

## 4. Sequence Models
- [ ] RNNs, the vanishing gradient problem
- [ ] LSTM and GRU
- [ ] Sequence-to-sequence models, encoder-decoder

## 5. Attention & Transformers
- [ ] Self-attention and the Query/Key/Value formulation
- [ ] Why scale by √dₖ
- [ ] Multi-head attention
- [ ] Cross-attention (encoder-decoder)
- [ ] Positional encoding (absolute vs RoPE)
- [ ] The full Transformer block: attention + feed-forward + norm + residual
- [ ] Vision Transformers (ViT) — attention beyond text

## 6. Common Problems & SOTA Solutions
- [ ] **Vanishing gradients in deep nets** → residual connections, normalization
- [ ] **Overfitting on limited image data** → data augmentation, transfer learning, pretrained backbones
- [ ] **Quadratic cost of self-attention on long sequences** → Flash Attention, sparse/linear attention
- [ ] **Slow inference** → quantization, distillation, pruning
- [ ] **Training instability at scale** → careful init, warmup, gradient clipping, mixed precision
