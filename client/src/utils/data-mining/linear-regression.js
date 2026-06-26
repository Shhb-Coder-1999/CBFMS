import * as tf from "@tensorflow/tfjs";

// Function to normalize a tensor and store normalization parameters
// function normalizeTensorFit(tensor) {
//   const maxval = tensor.max();
//   const minval = tensor.min();
//   const normalizedTensor = tensor.sub(minval).div(maxval.sub(minval));
//   return [normalizedTensor, maxval, minval];
// }

// // Function to normalize a tensor using stored normalization parameters
// function normalizeTensor(tensor, maxval, minval) {
//   const normalizedTensor = tensor.sub(minval).div(maxval.sub(minval));
//   return normalizedTensor;
// }

// // Function to denormalize a tensor using stored normalization parameters
// function unNormalizeTensor(tensor, maxval, minval) {
//   const unNormTensor = tensor.mul(maxval.sub(minval)).add(minval);
//   return unNormTensor;
// }

// // Function to prepare data for training
// function prepareData(stockData) {
//   const X = [];
//   const Y = [];
//   const window_size = 10; // Define the window size for sequences

//   for (let i = 0; i < stockData.length - window_size; i++) {
//     const sequence = stockData
//       .slice(i, i + window_size)
//       .map((item) => item.close);
//     const target = stockData[i + window_size].close;
//     X.push(sequence);
//     Y.push(target);
//   }

//   const inputTensor = tf.tensor2d(X);
//   const labelTensor = tf.tensor2d(Y, [Y.length, 1]).reshape([Y.length, 1]);

//   const [xs, inputMax, inputMin] = normalizeTensorFit(inputTensor);
//   const [ys, labelMax, labelMin] = normalizeTensorFit(labelTensor);

//   return { xs, ys, normalize: { inputMax, inputMin, labelMax, labelMin } };
// }

// // Function to train the model
// // Existing code for normalization functions and other helper functions

// // Function to train the model
// async function trainModel(
//   xs,
//   ys,
//   window_size,
//   n_epochs,
//   learning_rate,
//   n_layers,
//   callback
// ) {
//   const batch_size = 32;

//   const input_layer_shape = window_size;
//   const input_layer_neurons = 64;

//   const rnn_input_layer_features = 16;
//   const rnn_input_layer_timesteps =
//     input_layer_neurons / rnn_input_layer_features;
//   const rnn_input_shape = [rnn_input_layer_features, rnn_input_layer_timesteps];
//   const rnn_output_neurons = 16;

//   const output_layer_shape = rnn_output_neurons;
//   const output_layer_neurons = 1;

//   const inputTensor = tf.tensor2d(xs.arraySync());
//   const labelTensor = tf.tensor2d(ys.arraySync(), [ys.shape[0], 1]);

//   const [inputData, inputMax, inputMin] = normalizeTensorFit(inputTensor);
//   const [labelData, labelMax, labelMin] = normalizeTensorFit(labelTensor);

//   const model = tf.sequential();

//   model.add(
//     tf.layers.dense({
//       units: input_layer_neurons,
//       inputShape: [input_layer_shape],
//     })
//   );
//   model.add(tf.layers.reshape({ targetShape: rnn_input_shape }));

//   let lstm_cells = [];
//   for (let index = 0; index < n_layers; index++) {
//     lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }));
//   }

//   model.add(
//     tf.layers.rnn({
//       cell: lstm_cells,
//       inputShape: rnn_input_shape,
//       returnSequences: false,
//     })
//   );

//   model.add(
//     tf.layers.dense({
//       units: output_layer_neurons,
//       inputShape: [output_layer_shape],
//     })
//   );

//   model.compile({
//     optimizer: tf.train.adam(learning_rate),
//     loss: "meanSquaredError",
//   });

//   const hist = await model.fit(inputData, labelData, {
//     batchSize: batch_size,
//     epochs: n_epochs,
//     callbacks: {
//       onEpochEnd: async (epoch, log) => {
//         callback(epoch, log);
//       },
//     },
//   });

//   return {
//     model,
//     stats: hist,
//     normalize: { inputMax, inputMin, labelMax, labelMin },
//   };
// }

// // Function to make predictions (already defined)

// // Rest of the code (usage example, predictStockPrices function) remains the same

// // Function to make predictions using the trained model
// function makePredictions(X, model, dict_normalize) {
//   const inputTensor = tf.tensor2d(X);
//   const normalizedInput = normalizeTensor(
//     inputTensor,
//     dict_normalize.inputMax,
//     dict_normalize.inputMin
//   );
//   const model_out = model.predict(normalizedInput);
//   const predictedResults = unNormalizeTensor(
//     model_out,
//     dict_normalize.labelMax,
//     dict_normalize.labelMin
//   );

//   return Array.from(predictedResults.dataSync());
// }

// // Function to predict stock prices
// async function predict(stockData) {
//   const { xs, ys, normalize } = prepareData(stockData);

//   const n_epochs = 50; // Set the number of epochs for training
//   const learning_rate = 0.1; // Set the learning rate
//   const n_layers = 2; // Set the number of LSTM layers

//   const { model } = await trainModel(
//     xs,
//     ys,
//     xs.shape[1],
//     n_epochs,
//     learning_rate,
//     n_layers,
//     (epoch, log) => {
//       console.log(`Epoch ${epoch}: Loss = ${log.loss}`);
//     }
//   );

//   const predictions = makePredictions(xs.arraySync(), model, normalize);
//   debugger;
//   console.log("Predicted Stock Prices:", predictions);
//   return predictions;
// }
//////////////////////////////////////////////////////////////////////////////////////////////////
// Usage example
const stockData = [
  { timestamp: 1703030400000, close: 100 },
  { timestamp: 1703116800000, close: 105 },
  { timestamp: 1703203200000, close: 110 },
  // ... more data
];

// const predict = async (stockData) => {
//   debugger;
//   const trainingData = stockData.map((item) => ({
//     x: item.timestamp,
//     y: item.close, // Assuming 'close' is the closing stock price
//   }));
//   const model = tf.sequential({
//     layers: [
//       tf.layers.dense({ inputShape: [1], units: 64, activation: "relu" }),
//       tf.layers.dense({ units: 1 }),
//     ],
//   });

//   model.compile({ optimizer: "adam", loss: "meanSquaredError" });
//   const xs = tf.tensor1d(trainingData.map((item) => item.x));
//   const ys = tf.tensor1d(trainingData.map((item) => item.y));

//   await model.fit(xs, ys, { epochs: 50 });
//   debugger;
//   const futureDates = [1704153600000];
//   const futureTensor = tf.tensor1d(futureDates);
//   const predictions = model.predict(futureTensor).dataSync();
// };

//////////////////////////////////////////////////////////////////////

// async function save(model) {
//   await model.save(`localstorage://stockPredict`);
// }

// async function load() {
//   const models = await tf.io.listModels();
//   if (models["localstorage://stockPredict"]) {
//     const model = await tf.loadLayersModel("localstorage://stockPredict");
//     return model;
//   }
//   return Promise.resolve(null);
// }

// function normalize(tensor, prevMin) {
//   const min = prevMin || tensor.min(),
//     max = prevMin || tensor.max(),
//     normalisedTensor = tensor.sub(min).div(max.sub(min));
//   return normalisedTensor;
// }

// function denormalize(tensor, min, max) {
//   return tensor.mul(max.sub(min)).add(min);
// }

// Function to create a linear regression model
function createModel() {
  // Initialize a sequential model for linear regression
  // tf.sequential() - This means that the model will be sequential i.e output of one layer will act as an input to the other.
  const model = tf.sequential();

  // units - Our model has one unit.
  // inputDim - input dimension is 1 as we have only one feature which is the opening price
  // activation - We are using linear regression here, so using linear activation function here.
  // useBias - 'c' in our hypothesis function is called the bias term
  // Add a dense layer with linear activation and one unit
  model.add(
    tf.layers.dense({
      units: 1,
      inputDim: 1,
      activation: "linear",
      useBias: true,
    })
  );

  // Gradient descend is the algorithm that tries to find the minimum value for these terms to minimize the loss
  // Configure optimizer and compile the model
  let optimizer = tf.train.sgd(0.1); // Stochastic Gradient Descent optimizer
  model.compile({
    loss: "meanSquaredError", // Loss function for regression
    optimizer,
  });

  return model; // Return the created model
}

// Function to load and train the linear regression model
async function loadAndTrainModel(stockData) {
  // Extract open and close prices from stockData
  const features = stockData.map((item) => item.open);
  const outputs = stockData.map((item) => item.close);

  // Convert extracted data into TensorFlow tensors
  const featureTensor = tf.tensor2d(features, [features.length, 1]);
  const outputTensor = tf.tensor2d(outputs, [outputs.length, 1]);

  // Normalize the data by calculating min-max values
  const featureMin = featureTensor.min();
  const featureMax = featureTensor.max();
  const outputMin = outputTensor.min();
  const outputMax = outputTensor.max();

  const normalizedFeatures = featureTensor
    .sub(featureMin)
    .div(featureMax.sub(featureMin));
  const normalizedOutput = outputTensor
    .sub(outputMin)
    .div(outputMax.sub(outputMin));

  // Create a linear regression model
  const model = createModel();

  // Train the model on normalized features and outputs
  await model.fit(normalizedFeatures, normalizedOutput, {
    epochs: 20, // Number of training iterations
    validationSplit: 0.2, // Using validation split during training
  });

  const numPredictions = features.length;

  //randomXs here is a 2D tensor with numPredictions rows, each containing one value that is linearly spaced between 0 and 1.
  // This tensor is used as the X values for generating predictions with the trained linear regression model.
  const randomXs = tf
    .linspace(0, 1, numPredictions)
    .reshape([numPredictions, 1]);

  // Predict Y values based on the model
  const predictedYs = model.predict(randomXs);

  // Denormalize predicted X and Y values
  const xs = randomXs
    .mul(featureMax.sub(featureMin))
    .add(featureMin)
    .dataSync();
  const ys = predictedYs
    .mul(outputMax.sub(outputMin))
    .add(outputMin)
    .dataSync();

  // Construct predicted points (X, Y pairs)
  const predictedPoints = Array.from(xs).map((val, ind) => ({
    x: val,
    y: ys[ind],
  }));

  return predictedPoints; // Return the predicted points
}

// Function to predict values using the trained model
const predict = async (stockData) => {
  return loadAndTrainModel(stockData);
};

///////////////////////////////////////////////////////////////////////////////////////////////

// Modify the prepareData method in TimeSeriesData class to work with stockData
// class TimeSeriesData {
//   constructor() {
//     this.stockData = []; // Add a property to store the stock data
//   }

//   async loadData(stockData) {
//     // Assuming stockData is an array of objects with timestamp and close properties
//     this.stockData = stockData;
//   }

//   prepareData(timeID, depVar) {
//     return new Promise((resolve) => {
//       const x = this.stockData.map((item) => new Date(item[timeID]));
//       const y = this.stockData.map((item) => parseFloat(item[depVar]));

//       resolve({ X: x, y: y });
//     });
//   }
// }

// const train = async (
//   n_steps,
//   epochs,
//   n_features,
//   timeID,
//   depVar,
//   seq_x,
//   seq_y,
//   onEpochEnd
// ) => {
//   let ten_X = tf.tensor2d(seq_x, [seq_x.length, n_steps]);
//   let ten_y = tf.tensor1d(seq_y);

//   let model = tf.sequential();
//   model.add(
//     tf.layers.lstm({
//       units: 50,
//       activation: "relu",
//       inputShape: [n_steps, n_features],
//     })
//   );
//   model.add(tf.layers.dense({ units: 1 }));

//   model.compile({
//     optimizer: tf.train.adam(),
//     loss: tf.losses.meanSquaredError,
//     metrics: ["mse"],
//   });
//   ten_X = ten_X.reshape([ten_X.shape[0], n_steps, n_features]);

//   await model.fit(ten_X, ten_y, {
//     epochs: epochs,
//     callbacks: {
//       onEpochEnd: onEpochEnd,
//     },
//   });

//   return new Promise((resolve) => {
//     resolve(model);
//   });
// };
// const split_sequences = (sequence, n_steps) => {
//   return new Promise((resolve) => {
//     let seq_x = [];
//     let seq_y = [];

//     for (let i = 0; i < sequence.length; i++) {
//       let end_ix = i + n_steps;
//       console.debug(` i: ${i} end_ix:${end_ix}`);
//       if (end_ix > sequence.length) break;
//       seq_x.push(sequence.slice(i, end_ix));
//       seq_y.push(sequence[end_ix - 1]);
//     }

//     resolve({ seq_x, seq_y });
//   });
// };

// const prediction = (timeID, n_steps, n_features, model, seq_x) => {
//   return new Promise((resolve) => {
//     let ten_X = tf.tensor2d(seq_x, [seq_x.length, n_steps]);
//     ten_X = ten_X.reshape([ten_X.shape[0], n_steps, n_features]);
//     let predictions = [];
//     let count = 0;

//     predictions = seq_x.map((date) => {
//       let predicted = model.predict(ten_X.slice(count, 1));
//       count++;

//       return predicted.dataSync()[0];
//     });

//     resolve({ predictions: predictions });
//   });
// };

// // Usage:
// const predict = async (stockData) => {
//   const tsData = new TimeSeriesData();
//   await tsData.loadData(stockData);
//   const preparedData = await tsData.prepareData("timestamp", "close");

//   // Extract input sequences and output sequences
//   const trainSeqX = preparedData.X;
//   const trainSeqY = preparedData.y;

//   // Train the model using the prepared data
//   const model = await train(
//     10, // n_steps
//     50, // epochs
//     1, // n_features
//     "timestamp", // timeID
//     "close", // depVar
//     trainSeqX, // seq_x (training sequences)
//     trainSeqY, // seq_y (training targets)
//     async (epoch, log) => {
//       callback(epoch, log);
//     }
//   );

//   const predictions = await prediction(
//     "timestamp", // timeID
//     10, // n_steps
//     1, // n_features
//     model, // trained model
//     testSeqX // seq_x (sequences for prediction)
//   );
//   debugger;
//   console.log(predictions);
// };

export default predict;
