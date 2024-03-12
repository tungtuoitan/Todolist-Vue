<template>
    <input class="input" v-model="text" @input="handleInput" @keyup.enter="handleEnter" placeholder="typing here" />
</template>

<script setup>
import { useInputStore } from '@/store/inputStore';
import { useItemStore } from '@/store/itemStore';
import axios from 'axios';
const store = useInputStore()
const { text, updateText } = store
const {  updateList } = useItemStore()

const handleInput = (e) => {
    updateText(e.target.value)
}
const handleEnter = (e) => {
    const data = { text: e.target.value }
    axios.post('http://192.168.104.79:3000/add-item', data)
        .then((res) => {
            updateList(res.data)
        })
        .catch((err) => console.error(err))
    e.target.value = ''
}

</script>

<style scoped>
.container {
    border: 1px solid gray;
    width: 100%;
    height: 400px;
    margin-top: 40px;
}

.input {
    margin: 20px;
    width: 400px;
    height: 40px;
    border-radius: 10px;
    padding: 0 20px;
    outline: none;
    border: 1px solid transparent;
    background: gray;
    color: white;
}

.input:focus {
    border: 1px solid black;
}

.input::placeholder {
    color: rgba(255, 255, 255, 0.644);
}
</style>