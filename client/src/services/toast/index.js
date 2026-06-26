import { eventBus } from "src/utils";

const defaultDurationMapper = Object.freeze({
  toast: 3000,
  snackBar: 10000,
});

const toast = {
  isVisible: true,
  toggleVisibility: () => {
    toast.isVisible = !toast.isVisible;
  },
  setVisibility: (value) => {
    toast.isVisible = value;
  },
  showMessage({
    message = "",
    color = "",
    duration: toastDuration,
    type: toastType,
    id: toastId,
  }) {
    const defaultType = message.length > 100 ? "snackBar" : "toast";
    const defaultId = Math.random().toString(16).slice(2);

    const type = toastType || defaultType;
    const duration = toastDuration || defaultDurationMapper[type];
    const id = toastId || defaultId;

    if (toast.isVisible)
      eventBus.emit("showMessage", {
        message,
        color,
        duration,
        type,
        id,
      });

    return this;
  },

  onMessage(fn) {
    eventBus.on("showMessage", fn);

    return this;
  },

  destroy(fn) {
    eventBus.off("showMessage", fn);

    return this;
  },
};

export default toast;
