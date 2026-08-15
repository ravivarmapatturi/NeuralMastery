// Real, from-scratch implementations of KNN, a Gini-impurity decision tree,
// and Lloyd's-algorithm k-means, over 2D points the reader clicks to place.
// No ML library -- same "build it yourself" philosophy as mlp.js/attention.js.

function mulberry32(seed) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- K-Nearest Neighbors ---
export function knnPredict(points, k, x, y) {
  if (points.length === 0) return null;
  const dists = points
    .map((p) => ({ p, d: (p.x - x) ** 2 + (p.y - y) ** 2 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, Math.min(k, points.length));
  const counts = {};
  dists.forEach(({ p }) => {
    counts[p.label] = (counts[p.label] || 0) + 1;
  });
  return Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
}

// --- Decision Tree (axis-aligned, Gini impurity, greedy) ---
function gini(labels) {
  const counts = {};
  labels.forEach((l) => {
    counts[l] = (counts[l] || 0) + 1;
  });
  const n = labels.length;
  let impurity = 1;
  for (const l in counts) {
    const p = counts[l] / n;
    impurity -= p * p;
  }
  return impurity;
}

function bestSplit(points) {
  let best = null;
  for (const axis of ['x', 'y']) {
    const vals = [...new Set(points.map((p) => p[axis]))].sort((a, b) => a - b);
    for (let i = 0; i < vals.length - 1; i++) {
      const threshold = (vals[i] + vals[i + 1]) / 2;
      const left = points.filter((p) => p[axis] <= threshold);
      const right = points.filter((p) => p[axis] > threshold);
      if (!left.length || !right.length) continue;
      const impurity =
        (left.length * gini(left.map((p) => p.label)) + right.length * gini(right.map((p) => p.label))) /
        points.length;
      if (!best || impurity < best.impurity) best = { axis, threshold, impurity, left, right };
    }
  }
  return best;
}

function majorityLabel(points) {
  const counts = {};
  points.forEach((p) => {
    counts[p.label] = (counts[p.label] || 0) + 1;
  });
  return Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
}

export function buildTree(points, maxDepth, depth = 0) {
  const uniqueLabels = new Set(points.map((p) => p.label));
  if (uniqueLabels.size <= 1 || depth >= maxDepth || points.length < 2) {
    return { leaf: true, label: majorityLabel(points) };
  }
  const split = bestSplit(points);
  if (!split) return { leaf: true, label: majorityLabel(points) };
  return {
    leaf: false,
    axis: split.axis,
    threshold: split.threshold,
    left: buildTree(split.left, maxDepth, depth + 1),
    right: buildTree(split.right, maxDepth, depth + 1),
  };
}

export function treePredict(tree, x, y) {
  let node = tree;
  while (!node.leaf) {
    const val = node.axis === 'x' ? x : y;
    node = val <= node.threshold ? node.left : node.right;
  }
  return node.label;
}

// --- K-Means (Lloyd's algorithm) ---
export function kmeans(points, k, iterations = 12, seed = 7) {
  if (points.length === 0) return { assignments: [], centroids: [] };
  const rand = mulberry32(seed);
  const shuffled = [...points].sort(() => rand() - 0.5);
  let centroids = shuffled.slice(0, Math.min(k, points.length)).map((p) => ({ x: p.x, y: p.y }));
  let assignments = points.map(() => 0);

  for (let iter = 0; iter < iterations; iter++) {
    assignments = points.map((p) => {
      let best = 0;
      let bestD = Infinity;
      centroids.forEach((c, i) => {
        const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    });
    centroids = centroids.map((c, i) => {
      const assigned = points.filter((_, pi) => assignments[pi] === i);
      if (!assigned.length) return c;
      return {
        x: assigned.reduce((s, p) => s + p.x, 0) / assigned.length,
        y: assigned.reduce((s, p) => s + p.y, 0) / assigned.length,
      };
    });
  }

  return { assignments, centroids };
}
