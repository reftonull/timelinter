<script setup>
import FancyButton from "@/components/FancyButton.vue";
import { ref } from "vue";
import { store } from "./store";
import { onMounted } from "vue";
import router from "./router";

onMounted(() => {
    if (sessionStorage.getItem("token")) {
        store.token = sessionStorage.getItem("token");
    }
});

function logout() {
    sessionStorage.removeItem("token");
    store.token = null;
    store.user = null;
    router.push("login");
}
</script>

<template>
    <header>
        <div class="logo">TIME<strong>LINTER</strong></div>
        <div class="spacer"></div>
        <div v-if="!store.token" class="buttonRow">
            <RouterLink to="/register"
                ><div class="register normalBtn">Register</div></RouterLink
            >
            <RouterLink to="/login"><FancyButton text="Login" /></RouterLink>
        </div>
        <div v-if="store.token" class="buttonRow">
            <div @click="logout" class="normalBtn">Logout</div>
            <RouterLink to="/timelines"
                ><div class="register normalBtn">Timelines</div></RouterLink
            >
            <RouterLink to="/people"
                ><div class="register normalBtn">People</div></RouterLink
            >
            <RouterLink to="/add"><FancyButton text="Add" /></RouterLink>
        </div>
    </header>

    <RouterView />
</template>

<style>
@import "@/assets/base.css";

header {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.logo {
    font-size: 2.5rem;
}

.spacer {
    flex-grow: 1;
}

.buttonRow {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
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
</style>
