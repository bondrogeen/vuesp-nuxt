<template>
  <ul class="v-list">
    <li v-for="(item, i) of list" :key="'list_' + i" class="v-list__item" @click="onClick(item)">
      <slot :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
  list: { type: Array, default: () => [] },
});

const emit = defineEmits(['click']);
const onClick = e => emit('click', e);
</script>

<style lang="scss">
.v-list {
  border-radius: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  &__item {
    min-height: 40px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid var(--border-1);
    }
    white-space: nowrap;
    &:hover {
      background-color: var(--hover);
    }
  }
}
</style>
