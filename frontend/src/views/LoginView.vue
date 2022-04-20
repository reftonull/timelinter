<template>
    <div class="form">
        <h1>Login</h1>
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <div @click="login" class="btn">Login</div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store.js";
import axios from "axios";
import router from "../router";

const email = ref("");
const password = ref("");

async function login() {
    console.log(store.url);
    const response = await axios.post("api/login", {
        email: email.value,
        password: password.value,
    });

    if (response.data.error) {
        console.log(response.data.error);
    }

    if (response.status === 200 && response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        store.token = response.data.token;
        store.uid = response.data.user._id;
        store.email = response.data.user.email;
        console.log(store.uid);
    }

    router.push("/timelines");

    console.log(response.data);
}
</script>

<style scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

h1 {
    text-align: center;
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
