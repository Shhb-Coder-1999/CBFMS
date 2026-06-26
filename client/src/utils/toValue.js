import { isRef, unref } from "vue";

const toValue = (source) => {
  const sourceMapper = [
    {
      condition: isRef(source),
      get: () => unref(source),
    },
    {
      condition: typeof source === "function",
      get: () => source(),
    },
    {
      condition: true,
      get: () => source,
    },
  ];

  const { get: getValue } = sourceMapper.find(({ condition }) => condition);
  return getValue();
};

export default toValue;
