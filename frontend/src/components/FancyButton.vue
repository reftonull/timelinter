<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    {{text}}
  </div>
</template>

<style scoped>
div {
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
</style>
