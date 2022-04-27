<template>
    <div class="container">
        <div>{{ problem.person.name }}</div>
        <div>
            {{ formattedStart }} -
            {{ formattedEnd }}
        </div>
        <div>{{ problem.type }}</div>
    </div>
</template>

<script setup>
import { DateTime } from "luxon";
const props = defineProps(["problem"]);

const startDt = DateTime.fromJSDate(props.problem.start);
const endDt = DateTime.fromJSDate(props.problem.end);

const format = "ccc HH:mm";

const formattedStart = startDt.toFormat(format);
const formattedEnd = endDt.toFormat(format);
</script>

<style scoped>
.container {
    background-color: rgba(253, 39, 39, 0.1);
    border-radius: 10px;
    padding: 0.5em;
    cursor: pointer;
}
</style>
