<template>
    <div class="header">

        <router-link to="/list/current" class="head-item " :class="{ 'on': current === 'current' }"
            @click="handleClick">Current
            list </router-link>
        <router-link to="/list/done" class="head-item" :class="{ 'on': current[1] === 'o' }" @click="handleClick">Done
            list
        </router-link>
        <router-link to="/list/delete" class="head-item" :class="{ 'on': current[1] === 'e' }"
            @click="handleClick">Delete
            list </router-link>
    </div>
</template>

<script setup>
import { useHeadStore } from '@/store/headStore'
import { storeToRefs } from 'pinia';

const { current } = storeToRefs(useHeadStore())
const { updateCurrent } = useHeadStore()

const handleClick = (e) => {
    let text = e.target.innerHTML
    if (text[1] === "u") {
        updateCurrent('current')
    } else if (text[1] === "o") {
        updateCurrent('done')
    } else if (text[1] === "e") {
        updateCurrent('delete')
    }

}
</script>

<style scoped>
.head-item {
    display: inline-block;
    padding: 20px;
    color: rgba(255, 255, 255, 0.684);
}

.header {
    background: rgb(137, 137, 16);
    color: white;
    font-weight: bold;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
}

.on {
    background: white;
    color: black;
}
</style>
