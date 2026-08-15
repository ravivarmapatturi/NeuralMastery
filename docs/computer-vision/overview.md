---
sidebar_position: 1
---

# Computer Vision — Overview

[CNNs](../deep-learning/cnns.md) and [Vision Architectures](../deep-learning/vision-architectures.md) already cover the *models* — the ResNet/ViT/YOLO/U-Net lineage. This section is the rest of computer vision: what an image actually *is* to a computer before any model touches it, the full taxonomy of vision tasks beyond classification/detection/segmentation, and where vision is headed — video, 3D, and vision fused with language.

## What's in this section

- **[Vision Fundamentals](./vision-fundamentals.md)** — image representation, convolution as classical filtering (not just a neural network layer), morphology, edge detection, feature extraction, data augmentation.
- **[Vision Tasks & Models](./vision-tasks-and-models.md)** — the full task taxonomy: classification, detection, segmentation (recapped, with links to the deep-dive architecture pages), plus pose estimation, OCR, object tracking, depth estimation, and optical flow.
- **[Modern Vision & Multimodal](./modern-vision-and-multimodal.md)** — Vision Transformers in production, vision-language models and image-text alignment (CLIP), image and video generation, video understanding, and 3D vision.

## Why This Is Its Own Section

Vision has enough surface area — and enough tasks that never come up in a typical "CNN → ResNet → done" DL curriculum (pose estimation, optical flow, OCR, depth estimation) — that folding it entirely into Deep Learning under-serves it. The model architectures stay in [Deep Learning](../deep-learning/roadmap.md), cross-linked heavily from here; this section is the task-and-application layer on top of them.

See the [roadmap](./roadmap.md) for the full ordered path.
