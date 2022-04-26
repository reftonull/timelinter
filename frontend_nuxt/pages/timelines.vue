<template>
    <div>
        <h1>Timelines</h1>
        <div
            class="listItem"
            v-for="timeline in timelineStore.timelines"
            :key="timeline.name"
        >
            {{ timeline.name }}
        </div>
        <div v-if="!timelineStore.timelines">
            <h3>There are no timelines!</h3>
        </div>
    </div>
</template>

<script setup>
import { useTimelineStore } from "../stores/timeline";

const timelineStore = useTimelineStore();

onMounted(async () => {
    console.log("timeline mounted");
    timelineStore.getTimelines();
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
