import { ref } from "vue";
import { defineStore } from "pinia";

export const useItemStore = defineStore("item", () => {
  const list = ref([]);

  const updateList = (data) => {
    list.value = [...data];
  };

  return {
    list, updateList,
  };
});
