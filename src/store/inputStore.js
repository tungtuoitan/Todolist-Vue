import { defineStore } from "pinia";
import { ref } from "vue";

export const useInputStore = defineStore("input", () => {
  const text = ref("");
  const updateText = (value) => {
    text.value = value;
  };

  return { text, updateText };
});
