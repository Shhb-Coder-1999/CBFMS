import toValue from "./toValue";

const ChainOfResponsibility = class {
  static #availableOrders = ["first", "last", "all"];
  static #orderStrategies = {
    first: (chains) => [chains.find(({ condition }) => toValue(condition))?.handler],
    last: (chains) => [chains.findLast(({ condition }) => toValue(condition))?.handler],
    all: (chains) =>
      chains.reduce((acc, { condition, handler }) => (toValue(condition) ? [...acc, handler] : acc), []),
  };
  static createChainNode = (condition, handler) => ({
    condition,
    handler,
  });

  constructor(chains = [], order = "all") {
    if (!ChainOfResponsibility.#availableOrders.includes(order)) throw new Error("order is inValid!");

    this.chains = chains;
    this.order = order;
  }

  #getExecutionHandlers() {
    const executionHandlers = ChainOfResponsibility.#orderStrategies[this.order](this.chains);
    const isHandlersExecutable = executionHandlers && executionHandlers.length && executionHandlers.at(0);

    return isHandlersExecutable && executionHandlers;
  }
  reduce(payload) {
    const reduceHandlers = this.#getExecutionHandlers();
    if (!reduceHandlers) return payload;

    return reduceHandlers.reduce((acc, handler) => acc.filter(handler), payload);
  }
  execute(payload) {
    const executionHandlers = this.#getExecutionHandlers();
    if (!executionHandlers) return;

    for (const handler of executionHandlers) {
      const executionValue = handler(payload);
      if (executionValue) return executionValue;
    }
  }
  asyncExecute(payload) {
    const executionHandlers = this.#getExecutionHandlers();
    if (!executionHandlers) return Promise.resolve(null);

    return Promise.all(executionHandlers.map((handler) => handler(payload)));
  }
};

export default ChainOfResponsibility;
