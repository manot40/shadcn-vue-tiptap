<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';

import { toRef } from 'vue';

import { ToggleGroup, ToggleGroupItem } from '@ui/toggle-group';

import { RICHTEXT_ACTION } from '@lib/rich-text';
import { createTextFormatModel } from '@lib/tiptap';

const ACTION = Object.fromEntries(
  Object.entries(RICHTEXT_ACTION.TEXT_FORMAT).filter(([key]) => !/^heading_(4|5|6)$/.test(key))
);

const props = defineProps<{ editor: Editor }>();
const editor = toRef(props, 'editor');
const textFormat = createTextFormatModel(editor, ACTION);
</script>

<template>
  <ToggleGroup :tabindex="-1" v-model="textFormat" type="single">
    <ToggleGroupItem
      v-for="([key, value], i) of Object.entries(ACTION)"
      :key
      :value="key"
      :tabindex="i + 1"
      :aria-label="`Toggle ${key}`">
      <component :is="value.icon" class="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
