import { computed } from "vue";
const objectNavigator = (store, path) => {
  let refHolder = "";
  let key = "";
  const sanitizedPath = path.trim().split(".");
  sanitizedPath.reduce((reference, pathKey) => {
    refHolder = reference;
    key = pathKey;
    return reference?.[pathKey];
  }, store);
  return [refHolder, key];
};

const useConcreteState = (store, path) => {
  const navigationContext = computed(() => objectNavigator(store, path));

  return computed({
    get() {
      const [reference, key] = navigationContext.value;
      return reference[key];
    },
    set(value) {
      const [reference, key] = navigationContext.value;
      reference[key] = value;
    },
  });
};

export { useConcreteState };
export default useConcreteState;
