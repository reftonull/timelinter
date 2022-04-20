<template>
    <h1>Timelines</h1>
    <!-- <div class="listItem" v-for="timeline in timelines.values()" :key="timeline.name">
        {{ timeline.name }}
    </div>
    <div v-if="!timelines.values()"><h3>There are no timelines!</h3></div> -->
</template>

<script setup>
import { onMounted, shallowRef } from "@vue/runtime-core";
import axios from "axios";
import { store } from "../store";

let timelines = shallowRef([]);
onMounted(async () => {
    const response = await axios.get("/secure/timelines?secret_token=" + store.token +"&id=" + store.uid);
    timelines.value = response.data.timelines;
    console.log("api response is: " + timelines.value);
});
</script>

<style scoped>
h1 {
    text-align: center;
}
div {
    text-align: center;
}
.listItem {
  font-size: 16px;
  padding: 1em;
  text-align: left;
  background-color: var(--color-background-mute);
  margin: 1em;
  border-radius: 8px;
}
</style>
