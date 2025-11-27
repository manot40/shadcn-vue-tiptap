<script setup lang="ts">
import { createMarkModel } from '@lib/tiptap';
import { RICHTEXT_ACTION } from '@lib/rich-text';

import { ImageIcon, Link2Icon } from 'lucide-vue-next';

// Tiptap Core
import { FloatingMenu } from '@tiptap/vue-3/menus';
import { EditorContent, useEditor } from '@tiptap/vue-3';
// Tiptap Extensions
import { StarterKit } from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { Image as ImageExtension } from '@tiptap/extension-image';

import TextStyle from './components/text-style.vue';
import TextFormat from './components/text-format.vue';
import FloatingAction from './components/floating-action.vue';

import { ToggleGroup, ToggleGroupItem } from '@ui/toggle-group';
import { Card, CardHeader, CardContent } from '@ui/card';

withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: 'Masukkan sesuatu...',
});

const editor = useEditor({
  extensions: [StarterKit, TextStyleKit, ImageExtension.configure({ allowBase64: true })],
});

const mark = createMarkModel(editor, RICHTEXT_ACTION.MARK);
</script>

<template>
  <div class="grid place-content-center h-dvh">
    <div class="max-w-3xl mx-auto w-screen">
      <Card class="size-full aspect-video p-0 gap-3">
        <CardHeader class="flex gap-3 p-2.5 pb-0">
          <TextStyle :editor />
          <TextFormat :editor />
          <ToggleGroup v-model="mark" type="multiple" variant="outline">
            <ToggleGroupItem
              v-for="[key, value] of Object.entries(RICHTEXT_ACTION.MARK)"
              :key
              :value="key"
              :aria-label="`Toggle ${key}`">
              <component :is="value.icon" class="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup :modelValue="null" variant="outline">
            <ToggleGroupItem value="image">
              <ImageIcon class="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="hyperlink">
              <Link2Icon class="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>

        <CardContent
          class="relative z-0 flex-1 px-3 overflow-auto"
          @click.self="editor?.chain().focus('end').run()">
          <EditorContent :editor class="editor" />
          <template v-if="editor">
            <FloatingMenu :editor>
              <Card v-if="!editor.isEmpty" class="p-0 text-sm rounded-lg">
                <FloatingAction :editor />
              </Card>
            </FloatingMenu>
            <p v-if="editor.isEmpty" aria-hidden class="absolute top-0 text-muted-foreground/80 -z-10">
              {{ placeholder }}
            </p>
          </template>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
@reference '@/style.css';

.editor > :deep(.tiptap) {
  @apply text-sm focus-visible:outline-none;

  ol,
  ul {
    @apply mt-2;
  }
  ol {
    @apply list-decimal;
  }
  ul {
    @apply list-disc;
  }
  li {
    @apply ml-6;
  }
  p {
    @apply mb-1 leading-5;
  }

  h1,
  h2 {
    @apply font-bold mb-3;
  }
  h3,
  h4 {
    @apply font-semibold mb-2 mt-1;
  }
  h5,
  h6 {
    @apply font-medium;
  }
  h1 {
    @apply text-3xl mt-2;
  }
  h2 {
    @apply text-xl mt-1;
  }
  h3,
  h4 {
    @apply text-lg;
  }
  h5,
  h6 {
    @apply text-base my-1.5;
  }

  blockquote {
    @apply border-l-4 border-muted-foreground/30 my-4 pl-4 text-base;
  }
}
</style>
