<template>
    <div class="appContainer">
        <!-- Markup shared across all pages, ex: NavBar -->
        <header>
            <div class="logo">TIME<strong>LINTER</strong></div>
            <div class="spacer"></div>
            <div v-if="!options.token" class="buttonRow">
                <NuxtLink to="/register"
                    ><div class="register normalBtn">Register</div></NuxtLink
                >
                <NuxtLink to="/login">
                    <div class="fancyBtn">Login</div>
                </NuxtLink>
            </div>
            <div v-if="options.token" class="buttonRow">
                <div @click="logout" class="normalBtn">Logout</div>
                <NuxtLink to="/timelines"
                    ><div class="register normalBtn">Timelines</div></NuxtLink
                >
                <NuxtLink to="/people"
                    ><div class="register normalBtn">People</div></NuxtLink
                >
                <NuxtLink to="/add"><div class="fancyBtn">Add</div></NuxtLink>
            </div>
        </header>
        <NuxtPage />
    </div>
</template>

<script setup>
import { useOptionsStore } from "./stores/options";

const options = useOptionsStore();

async function logout() {
    options.logout();
    await navigateTo("/login");
}

onMounted(() => {
    options.setTokenFromStorage();
});
</script>

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

.fancyBtn {
    font-size: 16px;
    display: inline-block;
    border-radius: 8px;
    transition: background-color 0.5s, color 0.5s;
    position: relative;
    font-weight: 600;
    background-color: var(--vt-c-blue);
    color: #fff;
    margin-right: 18px;
    padding: 8px 1em 8px 1em;
}

html,body, #__nuxt, #__layout{
  height:100%!important;
  width: 100%!important;
}

.appContainer {
    height: 100%;
}
</style>
