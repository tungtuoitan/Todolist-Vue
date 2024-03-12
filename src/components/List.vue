<template>
    <div class="container">
        <template v-for="item in displayList " :key="item.id">
            <Item :item="item" />
        </template>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Item from './Item.vue';
import { watch, ref } from 'vue'
import { useItemStore } from '@/store/itemStore';
import { useHeadStore } from '@/store/headStore';
import { onMounted } from 'vue';
import axios from 'axios';

const { list } = storeToRefs(useItemStore())
const { updateList } = useItemStore()
const { current } = storeToRefs(useHeadStore())
let displayList = ref([])

watch([current, list], () => {
    const listCopy = JSON.parse(JSON.stringify(list.value))
    if (current.value === 'current') {
        displayList.value = listCopy.filter((item) => item.state === 'new')
    }
    else if (current.value === 'done') {
        displayList.value = listCopy.filter((item) => item.state === 'done')
    }
    else if (current.value === 'delete') {
        displayList.value = listCopy.filter((item) => item.state === 'delete')
    }
})

onMounted(() => {
    axios.get('http://192.168.104.79:3000/get-data')
        .then((res) => {
            updateList(res.data)
            const listCopy = JSON.parse(JSON.stringify(list.value))
            displayList.value = listCopy.filter((item) => item.state === 'new')
        })
        .catch((err) => console.error(err))
})


</script>

<style scoped>
.on {
    display: block !important;
}

.cont {
    display: none;
}
</style>