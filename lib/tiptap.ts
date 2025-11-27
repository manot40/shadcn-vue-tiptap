import type { Editor } from '@tiptap/vue-3';

import { computed, unref, type FunctionalComponent, type MaybeRef } from 'vue';

export type EditorCommandMap = Record<string, { icon: FunctionalComponent; label?: string }>;

export const createTextFormatModel = <T extends EditorCommandMap>(
  editor: MaybeRef<Editor | undefined>,
  marks: T
) => {
  const model = computed({
    get() {
      const ed = unref(editor);
      if (!ed) return;
      return Object.keys(marks).find((key_) => {
        const [key = '', level] = key_.split('_');
        if (level) return ed.isActive(key, { level: +level });
        if (key.includes('List')) return ed.isActive(key);
        return ed.isActive(key);
      });
    },
    set(val) {
      const chain = unref(editor)?.chain().focus();
      if (chain) {
        if (!val) return chain.setParagraph().run();
        const [key = '', level] = val.split('_');

        if (level) chain.toggleHeading({ level: +level as 1 | 2 }).run();
        else if (key === 'quote') chain.toggleBlockquote().run();
        else if (key.includes('List')) chain.toggleList(key, 'listItem').run();
        else chain.setParagraph().run();
      }
    },
  });

  return model;
};

export const createMarkModel = <T extends EditorCommandMap>(
  editor: MaybeRef<Editor | undefined>,
  marks: T
) => {
  const model = computed({
    get() {
      const ed = unref(editor);
      if (!ed) return [];
      return Object.keys(marks).flatMap((item: keyof T) => (ed.isActive(item) ? item : []));
    },
    set(val) {
      const ed = unref(editor);
      const old = model.value;
      const isAdd = old.length < val.length;
      const isRemove = old.length > val.length;

      if (isRemove) {
        (old as string[]).forEach((item) => {
          if (val.includes(item)) return;
          ed?.chain().focus().unsetMark(item).run();
        });
      } else if (isAdd) {
        (val as string[]).forEach((item) => {
          if (old.includes(item)) return;
          ed?.chain().focus().setMark(item).run();
        });
      }
    },
  });

  return model;
};
