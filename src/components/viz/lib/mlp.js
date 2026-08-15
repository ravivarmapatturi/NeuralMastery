// A small, dependency-free multi-layer perceptron with hand-written
// forward/backward passes -- the browser-native sibling of the
// Build From Scratch section's "implement a neural network" project.
// Deliberately not TensorFlow.js / a library: the entire point of this
// engine is that the actual backprop math is visible and small enough to
// read end to end.
//
// Architecture: 2 inputs -> N hidden layers (configurable width/depth,
// ReLU/tanh activation) -> 1 sigmoid output, trained with full-batch
// gradient descent on binary cross-entropy loss.

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

const ACTIVATIONS = {
  relu: {
    f: (z) => Math.max(0, z),
    df: (z) => (z > 0 ? 1 : 0),
  },
  tanh: {
    f: (z) => Math.tanh(z),
    df: (z) => 1 - Math.tanh(z) ** 2,
  },
  sigmoid: {
    f: (z) => 1 / (1 + Math.exp(-z)),
    df: (z) => {
      const s = 1 / (1 + Math.exp(-z));
      return s * (1 - s);
    },
  },
};

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

export class MLP {
  /**
   * @param {number[]} layerSizes e.g. [2, 8, 8, 1] -- input, hidden..., output(=1)
   * @param {'relu'|'tanh'} hiddenActivation
   * @param {number} seed
   */
  constructor(layerSizes, hiddenActivation = 'relu', seed = 1) {
    this.layerSizes = layerSizes;
    this.hiddenActivation = hiddenActivation;
    const rand = mulberry32(seed);
    const gaussian = () => {
      const u1 = Math.max(rand(), 1e-6);
      const u2 = rand();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    };

    this.weights = [];
    this.biases = [];
    for (let l = 0; l < layerSizes.length - 1; l++) {
      const fanIn = layerSizes[l];
      const fanOut = layerSizes[l + 1];
      const scale = Math.sqrt(2 / fanIn); // He initialization
      const W = Array.from({ length: fanOut }, () =>
        Array.from({ length: fanIn }, () => gaussian() * scale)
      );
      this.weights.push(W);
      this.biases.push(new Array(fanOut).fill(0));
    }
  }

  forward(x) {
    const activations = [x];
    const zs = [];
    let a = x;
    const nLayers = this.weights.length;
    for (let l = 0; l < nLayers; l++) {
      const W = this.weights[l];
      const b = this.biases[l];
      const z = W.map((row, j) => row.reduce((s, w, i) => s + w * a[i], 0) + b[j]);
      zs.push(z);
      const isOutput = l === nLayers - 1;
      const act = isOutput ? sigmoid : ACTIVATIONS[this.hiddenActivation].f;
      a = z.map(act);
      activations.push(a);
    }
    return { activations, zs };
  }

  predict(x) {
    return this.forward(x).activations[this.weights.length][0];
  }

  /** One full-batch gradient-descent step over (X, y). Returns mean BCE loss. */
  step(X, y, lr) {
    const nLayers = this.weights.length;
    const gradW = this.weights.map((W) => W.map((row) => row.map(() => 0)));
    const gradB = this.biases.map((b) => b.map(() => 0));
    let totalLoss = 0;
    const n = X.length;
    const hiddenDf = ACTIVATIONS[this.hiddenActivation].df;

    for (let i = 0; i < n; i++) {
      const { activations, zs } = this.forward(X[i]);
      const yHat = activations[nLayers][0];
      const target = y[i];
      const eps = 1e-7;
      totalLoss += -(target * Math.log(yHat + eps) + (1 - target) * Math.log(1 - yHat + eps));

      // Output layer delta: dL/dz for sigmoid + BCE simplifies to (yHat - target).
      let delta = [yHat - target];

      for (let l = nLayers - 1; l >= 0; l--) {
        const aPrev = activations[l];
        for (let j = 0; j < delta.length; j++) {
          gradB[l][j] += delta[j];
          for (let k = 0; k < aPrev.length; k++) {
            gradW[l][j][k] += delta[j] * aPrev[k];
          }
        }
        if (l > 0) {
          const W = this.weights[l];
          const zPrev = zs[l - 1];
          const nextDelta = new Array(zPrev.length).fill(0);
          for (let k = 0; k < zPrev.length; k++) {
            let sum = 0;
            for (let j = 0; j < delta.length; j++) sum += W[j][k] * delta[j];
            nextDelta[k] = sum * hiddenDf(zPrev[k]);
          }
          delta = nextDelta;
        }
      }
    }

    for (let l = 0; l < nLayers; l++) {
      for (let j = 0; j < this.weights[l].length; j++) {
        this.biases[l][j] -= (lr * gradB[l][j]) / n;
        for (let k = 0; k < this.weights[l][j].length; k++) {
          this.weights[l][j][k] -= (lr * gradW[l][j][k]) / n;
        }
      }
    }

    return totalLoss / n;
  }
}
