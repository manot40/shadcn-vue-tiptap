import type { EditorCommandMap } from './tiptap';

import {
  List,
  ListOrdered,
  QuoteIcon,
  TypeIcon,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from 'lucide-vue-next';

export const RICHTEXT_ACTION = {
  MARK: {
    bold: { icon: Bold },
    italic: { icon: Italic },
    strike: { icon: Strikethrough },
    underline: { icon: Underline },
  },
  LIST: {
    bulletList: { icon: List },
    orderedList: { icon: ListOrdered },
  },
  TEXT_FORMAT: {
    paragraph: { icon: TypeIcon, label: 'Body' },
    heading_1: { icon: Heading1, label: 'Heading 1' },
    heading_2: { icon: Heading2, label: 'Heading 2' },
    heading_3: { icon: Heading3, label: 'Heading 3' },
    heading_4: { icon: Heading4, label: 'Heading 4' },
    heading_5: { icon: Heading5, label: 'Heading 5' },
    heading_6: { icon: Heading6, label: 'Heading 6' },
    quote: { icon: QuoteIcon, label: 'Quote' },
    bulletList: { icon: List, label: 'Bullet List' },
    orderedList: { icon: ListOrdered, label: 'Ordered List' },
  },
} satisfies Record<string, EditorCommandMap>;

export type { EditorCommandMap };
