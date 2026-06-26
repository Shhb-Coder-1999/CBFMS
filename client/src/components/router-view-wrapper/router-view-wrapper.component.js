import { defineAsyncComponent, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const Layout = computed(() => {
      console.log(layout.value);
      return defineAsyncComponent(() =>
        import(`../../layouts/${layout.value}.vue`)
      );
    });

    const layout = computed(() => route?.meta?.layout || "defaultLayout");

    return {
      Layout,
    };
  },
};
