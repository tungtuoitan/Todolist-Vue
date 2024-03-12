import { defineStore } from "pinia";
import { ref } from "vue";

export const useHeadStore = defineStore("boss", () => {
  let current = ref("current");
  const updateCurrent = (text) => {
    current.value = text;
  };

  return { current, updateCurrent };
});
