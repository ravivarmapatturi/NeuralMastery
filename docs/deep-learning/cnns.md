---
sidebar_position: 5
---

# Convolutional Neural Networks (CNNs)

Before Transformers took over vision too, CNNs were — and largely still are — the default architecture for image data, because they bake in an assumption that fits images perfectly: nearby pixels are related, and patterns are useful no matter where they appear in the image.

## Convolution and Pooling

A **convolution** slides a small learnable filter (e.g. 3×3) across the image, computing a weighted sum at each position — detecting local patterns like edges or textures. Because the same filter is reused across the whole image, CNNs need far fewer parameters than a fully-connected layer would for the same input size, and they naturally handle patterns regardless of where they appear in the image ("translation invariance").

**Pooling** (typically max-pooling) downsamples the feature map, keeping the strongest activation in each local region — reduces spatial size and adds a small amount of positional robustness.

**Receptive field**: how much of the original image a given neuron "sees," which grows as you stack more convolutional layers — deeper layers see larger, more abstract patterns (edges → textures → parts → objects).

## The Architecture Lineage

- **LeNet** (1998) — the original proof-of-concept CNN, for digit recognition.
- **AlexNet** (2012) — the breakthrough that kicked off the deep learning boom, by training a deeper CNN on GPUs at ImageNet scale.
- **ResNet** (2015) — introduced residual connections (see [Training Deep Networks](./training-deep-networks.md)), enabling networks over 100 layers deep, which was previously untrainable.
- **EfficientNet** — systematically scales depth, width, and input resolution together for the best accuracy-per-compute tradeoff.

## Applications

- **Image classification**: assign a single label to an image.
- **Object detection**: locate and classify multiple objects within an image (bounding boxes).
- **Segmentation**: classify *every pixel* — used in medical imaging, autonomous driving.

## Why Vision Moved Toward Transformers Too

CNNs' locality assumption is also a limitation — capturing long-range relationships between distant parts of an image requires many stacked layers. Vision Transformers (ViT, covered in [Attention & Transformers](./attention-transformers.md)) instead split an image into patches and apply self-attention across all of them directly, letting any patch attend to any other patch from the very first layer. In practice, ViTs need more data to train well than CNNs (they lack CNNs' built-in locality bias), but they now match or beat CNNs at scale.

Next: [Sequence Models](./sequence-models.md) — the architectures built for data where order matters: text, time series, audio.
