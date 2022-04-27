<template>
    <div>
        <h1>Timelines</h1>
        <div v-for="timeline in timelineStore.timelines" :key="timeline.name">
            <NuxtLink :to="`/timelines/${timeline._id}`">
                <div class="listItem">
                    {{ timeline.name }}
                </div>
            </NuxtLink>
        </div>
        <div v-if="timelineStore.timelines.length === 0">
            <h3>There are no timelines!</h3>
        </div>
    </div>
</template>

<script setup>
import { useTimelineStore } from "../../stores/timeline";

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
    color: var(--color-text);
}
</style>
