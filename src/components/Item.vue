<template>
    <div class="item">
        <span class='content'>{{ item.text }}</span>
        <div class="right-cont">
            <div class="delete off" :class="{ 'on': current === 'current' }" @click="handleDel">X</div>
            <div class="done off" :class="{ 'on': current === 'current' }" @click="handleDone">✔</div>
            <div class="refresh off" :class="{ 'on': current === 'done' || current === 'delete' }"
                @click="handleRefresh">⟳</div>
        </div>

    </div>
</template>

<script setup>
import { useItemStore } from '@/store/itemStore';
import { useHeadStore } from '@/store/headStore';
import { storeToRefs } from 'pinia';
import axios from 'axios'
const { current } = storeToRefs(useHeadStore())
const { updateList } = useItemStore()
const props = defineProps(['item'])
const handleDone = () => {
    const data = props.item
    axios.post('http://192.168.104.79:3000/done-item', data)
        .then((res) => {
            updateList(res.data)
        })
        .catch((err) => console.error(err))
}
const handleDel = () => {
    const data = props.item
    axios.post('http://192.168.104.79:3000/delete-item', data)
        .then((res) => {
            updateList(res.data)
        })
        .catch((err) => console.error(err))
}
const handleRefresh = () => {
    const data = props.item
    axios.post('http://192.168.104.79:3000/refresh-item', data)
        .then((res) => {
            updateList(res.data)
        })
        .catch((err) => console.error(err))
}

</script>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;

    width: 400px;
    height: 50px;
    padding: 0px 20px;
    margin-bottom: 20px;
    margin-left: 20px;

    background: lightblue;
    border-radius: 10px;
    display: flex;
    align-items: center;
}


.right-cont {
    display: inline-flex;
    gap: 10px;
}

.edit {
    background: gray;
    color: white;
    width: 60px;
    height: 30px;
    border-radius: 20px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 20%
}

.done:hover {
    cursor: pointer;
    opacity: 100%;
    background: rgb(46, 181, 44);
}

.edit:hover {
    cursor: pointer;
    opacity: 100%;
    background: rgb(181, 167, 44);

}

.delete,
.done,
.refresh {
    background: gray;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 20%
}
.refresh{
    font-weight:bold;
}

.delete:hover {
    cursor: pointer;
    opacity: 100%;
    background: rgb(181, 44, 44);
}

.refresh:hover {
    cursor: pointer;
    opacity: 100%;
    background: rgb(44, 60, 181);

}

.off {
    display: none;
}

.on {
    display: flex !important;
}
</style>