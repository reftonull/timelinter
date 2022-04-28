<template>
    <div class="form">
        <h1>Register</h1>
        <input type="text" placeholder="Email" v-model="email" />
        <input
            @keyup.enter="login"
            type="password"
            placeholder="Password"
            v-model="password"
        />
        <div @click="register" class="btn">Register</div>
        <div class="error">{{ err }}</div>
        <div class="success">{{ success }}</div>
    </div>
</template>

<script setup>
import axios from "axios";

const email = useState("emailReg", () => "");
const password = useState("passwordReg", () => "");

const err = useState("err", () => "");
const success = useState("success", () => "");

async function register() {
    try {
        const response = await axios.post("/api/register", {
            email: email.value,
            password: password.value,
        });

        success.value = "Registration succeeded";
    } catch (e) {
        err.value = "Registration failed";
    }
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

.error {
    color: rgb(205, 103, 103);
}

.success {
    color: rgb(103, 205, 118);
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
