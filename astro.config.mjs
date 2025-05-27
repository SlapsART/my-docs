import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import astroExpressiveCode from 'astro-expressive-code';

export default defineConfig({
  integrations: [
    astroExpressiveCode(), 
    mdx(),
    react(),
    starlight({
      title: 'COSMOS Documentation',
      sidebar: [
        {
          label: 'Galaxy',
          autogenerate: { directory: 'galaxy' },
        },
        {
          label: 'Guides',
          items: [{ label: 'Example Guide', slug: 'guides/example' }],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
      // NO agregues 'theme', 'appearance', ni ninguna otra propiedad no documentada
    }),
  ],
});