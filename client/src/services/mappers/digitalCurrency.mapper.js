const digitalCurrencyMapper = (digitalCurrencies) => {
  const data = [];
  debugger;
  for (const [currencyDate, currencyValue] of Object.entries(
    digitalCurrencies
  )) {
    const values = Object.values(currencyValue);
    data.push({
      open: +values[0],
      close: +values[6],
      high: +values[2],
      low: +values[4],
      volume: +values[8],
      timestamp: +new Date(currencyDate).getTime(),
    });
  }
  return data;
};

export default digitalCurrencyMapper;

// "2023-12-07": {
//     "1a. open (CNY)": "313275.21636500",
//     "1b. open (USD)": "43762.69000000",
//     "2a. high (CNY)": "314456.94154500",
//     "2b. high (USD)": "43927.77000000",
//     "3a. low (CNY)": "312898.03500000",
//     "3b. low (USD)": "43710.00000000",
//     "4a. close (CNY)": "314273.11126500",
//     "4b. close (USD)": "43902.09000000",
//     "5. volume": "1342.70885000",
//     "6. market cap (USD)": "1342.70885000"
// },

// {
//     close: 4976.16,
//     high: 4977.99,
//     low: 4970.12,
//     open: 4972.89,
//     timestamp: 1587660000000,
//     volume: 204,
//   }
