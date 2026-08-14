---
sidebar_position: 2
---

# Machine Learning — Roadmap

Classical ML: the algorithms, the workflow around them, and the problems that show up constantly in practice.

## 1. ML Workflow Fundamentals
- [ ] Supervised vs unsupervised vs semi-supervised vs self-supervised learning
- [ ] Train / validation / test splits, cross-validation
- [ ] Data leakage — what it is and how it silently ruins models
- [ ] Feature engineering & feature selection
- [ ] Handling missing data, outliers, imbalanced classes
- [ ] Sampling strategies (stratified, bootstrap, SMOTE)

## 2. Supervised Learning
- [ ] Linear & logistic regression (and their assumptions)
- [ ] Decision trees, Random Forests, Gradient Boosting (XGBoost, LightGBM)
- [ ] Support Vector Machines
- [ ] k-Nearest Neighbors
- [ ] Naive Bayes
- [ ] Ensemble methods: bagging vs boosting vs stacking

## 3. Unsupervised Learning
- [ ] k-Means, hierarchical clustering, DBSCAN
- [ ] Dimensionality reduction: PCA, t-SNE, UMAP
- [ ] Anomaly detection

## 4. Model Evaluation & Metrics
- [ ] Bias-variance tradeoff, underfitting vs overfitting
- [ ] Regularization: L1, L2, dropout, early stopping
- [ ] Classification metrics: precision, recall, F1, ROC-AUC, PR-AUC
- [ ] Regression metrics: MSE, MAE, R²
- [ ] Calibration and threshold tuning
- [ ] Statistical significance of model improvements

## 5. Common Problems & Their State-of-the-Art Solutions
- [ ] **Class imbalance** → resampling, class weighting, focal loss
- [ ] **Overfitting on small data** → regularization, data augmentation, transfer learning
- [ ] **Concept drift in production** → monitoring, periodic retraining, online learning
- [ ] **Curse of dimensionality** → feature selection, PCA, regularization
- [ ] **Slow training on huge tabular data** → gradient boosting libraries (XGBoost/LightGBM), distributed training
- [ ] **Explainability** → SHAP, LIME, feature importance

## Further practice
- [deep-ml.com](https://www.deep-ml.com/) — implement classical ML algorithms from scratch
- Chip Huyen's [*Machine Learning Interviews Book*](https://huyenchip.com/ml-interviews-book/) — 200+ knowledge questions on classical ML
- [alirezadir/AIMLInterviews — ML Fundamentals](https://github.com/alirezadir/AIMLInterviews/blob/main/src/ml-fundamental.md) (MIT licensed)
