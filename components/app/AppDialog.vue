<template>
  <transition name="fade">
    <div v-if="value" class="app-dialog" @wheel.prevent>
      <div class="app-dialog__overlay" @click="onClose"></div>
      <div class="app-dialog__card">
        <div class="app-dialog__header text-h5">
          <v-icons class="app-dialog__close" icon="close" @click="onClose"></v-icons>
          <slot name="header">{{ title }}</slot>
        </div>
        <div class="app-dialog__body d-flex a-center text-title-1">
          <v-progressbar v-if="isProgress" :value="procent" />
          <slot>
            <div v-html="message"></div>
          </slot>
        </div>
        <div v-if="$slots.footer || callback" class="app-dialog__footer">
          <slot name="footer">
            <v-button size="small" @click="onButton">{{ button }}</v-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, computed, watch, inject, onMounted } from 'vue';
const props = defineProps({
  value: { type: Boolean, default: false },
  title: { type: String, default: 'Attention !' },
  message: { type: String, default: '' },
  content: { type: Object, default: () => ({}) },
  progress: { type: Object, default: () => ({}) },
  isProgress: { type: Boolean, default: false },
  callback: { type: Function, default: null },
  button: { type: String, default: 'OK' },
});

const emit = defineEmits(['close']);
const procent = computed(() => (props.progress.status ? Math.ceil((props.progress.size * 100) / props.progress.length) : 100));

const overlay = inject('overlay');
const onClose = e => emit('close', e);
const onButton = () => {
  if (props.callback) props.callback();
  onClose();
};

watch(
  () => props.value,
  value => (overlay.value = value)
);
onMounted(() => {
  if (props.value) overlay.value = true;
});
</script>

<style lang="scss">
.app-dialog {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 11;
  &__close {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
    svg {
      height: 20px;
    }
  }
  &__overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 100px;
    min-width: 280px;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-1);
    box-shadow: 0px 8px 35px -2px var(--shadow-1);
  }
  &__header {
    position: relative;
    padding: 10px 20px;
    border-bottom: 1px solid var(--border-1);
  }
  &__body {
    flex: 1 1 auto;
    padding: 15px 20px;
    min-height: 70px;
    max-height: 500px;
    overflow: auto;
  }
  &__footer {
    text-align: end;
    padding: 10px 15px;
    flex: 0 0 40px;
  }
}
</style>
