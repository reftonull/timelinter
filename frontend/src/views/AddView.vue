<template>
    <div class="form">
        <div class="buttonRow">
            <div class="normalBtn" @click="selected = 'Timeline'">Timeline</div>
            <div class="normalBtn" @click="selected = 'Person'">Person</div>
        </div>
        <div class="form" v-if="selected === 'Timeline'">
            <input type="text" placeholder="Name" v-model="tName" />
            <div @click="tAdd" class="btn">Add Timeline</div>
        </div>

        <div class="form" v-if="selected === 'Person'">
            <input type="text" placeholder="Name" v-model="pName" />
            <div @click="pAdd" class="btn">Add Person</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { store } from "../store";

const selected = ref("Timeline");
const tName = ref("");
const pName = ref("");

function pAdd() {
    const response = axios.post(
        "/secure/people/add?secret_token=" + store.token,
        {
            uid: store.uid,
            name: pName.value,
        }
    );
}

async function tAdd() {
    const response = await axios.post(
        "/secure/timelines/add?secret_token=" + store.token,
        {
            uid: store.uid,
            name: tName.value,
        }
    );
    console.log(response.data);
}
</script>

<style scoped>
.buttonRow {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
}

.normalBtn {
    font-size: 16px;
    display: inline-block;
    background-color: var(--color-background-mute);
    padding: 8px 18px;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.5s, color 0.5s;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
}

input {
    border: 1px solid var(--color-border);
    font-size: 16px;
    color: var(--color-text);
    border-radius: 8px;
    padding: 1em;
    background: transparent;
    transition: background-color 0.5s;
}
.btn {
    cursor: pointer;
    padding: 1em;
    font-size: 16px;
    display: inline-block;
    border-radius: 8px;
    transition: background-color 0.5s, color 0.5s;
    position: relative;
    font-weight: 600;
    background-color: var(--vt-c-blue);
    color: #fff;
    padding: 8px 1em 8px 1em;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
}

.form > * {
    max-width: 40em;
    min-width: 20em;
}
</style>
