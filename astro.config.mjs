// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'OSS Insights',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kozuke/oss-insights' }],
			sidebar: [
				{
					label: 'About',
					items: [
						{ label: 'このサイトについて', slug: 'index' },
					],
				},
				{
					label: 'Frontend',
					autogenerate: { directory: 'frontend' },
				},
				{
					label: 'Backend',
					autogenerate: { directory: 'backend' },
				},
				{
					label: 'CLI / Tools',
					autogenerate: { directory: 'cli' },
				},
				{
					label: 'Infrastructure',
					autogenerate: { directory: 'infra' },
				},
				{
					label: 'Summary',
					autogenerate: { directory: 'summary' },
				},
			],
		}),
	],
});
