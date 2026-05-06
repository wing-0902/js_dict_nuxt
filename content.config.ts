import { defineContentConfig, defineCollection } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
  collections: {
    dictionary: defineCollection({
      type: 'page',
      source: 'dict/**/index.md',
      schema: z.object({
        title: z.string(),
        品詞: z.string(),
        jsInclude: z.boolean().default(true),
        tsInclude: z.boolean().default(true),
        draft: z.boolean().default(false)
      })
    })
  }
});
