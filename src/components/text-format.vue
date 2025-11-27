<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';

import { toRef } from 'vue';

import { RICHTEXT_ACTION } from '@lib/rich-text';
import { createTextFormatModel } from '@lib/tiptap';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

const props = defineProps<{ editor?: Editor }>();
const editor = toRef(props, 'editor');
const textFormat = createTextFormatModel(editor, RICHTEXT_ACTION.TEXT_FORMAT);
</script>

<template>
  <Select v-model="textFormat" defaultValue="normal">
    <SelectTrigger class="w-36">
      <SelectValue placeholder="Mixed" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="[key, value] in Object.entries(RICHTEXT_ACTION.TEXT_FORMAT)"
        :key
        :value="key"
        class="flex items-center gap-1.5">
        <component :is="value.icon" class="size-4" />
        {{ value.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
