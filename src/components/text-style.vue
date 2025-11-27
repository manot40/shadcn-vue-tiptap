<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';

import { computed, toRef } from 'vue';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

const SIZES = ['12', '13', '14', '15', '16', '18', '20', '24'];

const props = defineProps<{ editor?: Editor }>();
const editor = toRef(props, 'editor');

const fontSize = computed({
  get: () => {
    const text = editor.value?.getAttributes('textStyle');
    if (text?.fontSize) return text.fontSize.replace('px', '');
    return '-';
  },
  set(value) {
    const cmd = editor.value?.commands;
    if (!cmd) return;
    if (value && value !== '-') cmd.setFontSize(`${value}px`);
    else cmd.unsetFontSize();
  },
});
</script>

<template>
  <Select v-model="fontSize" defaultValue="14">
    <SelectTrigger class="w-22">
      <SelectValue placeholder="Mixed" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="-">Unset</SelectItem>
      <SelectItem v-for="size in SIZES" :key="size" :value="size">
        {{ size }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
