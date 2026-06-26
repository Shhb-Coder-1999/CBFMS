import { eventBus } from "src/utils";

const loading = {
  show({ key = "", text = "", type = "" }) {
    eventBus.emit("show", { key, text, type });
    return this;
  },
  hide({ key = "" }) {
    eventBus.emit("hide", { key });
    return this;
  },

  onShow(fn) {
    eventBus.on("show", fn);
    return this;
  },
  onHide(fn) {
    eventBus.on("hide", fn);
    return this;
  },

  destroy(fn) {
    eventBus.off("show", fn);
    eventBus.off("hide", fn);

    return this;
  },
};

export default loading;
