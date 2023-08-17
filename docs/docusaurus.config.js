// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "typed-htmx",
	tagline: "JSX definitions for htmx",
	favicon: "img/favicon.ico",

	url: "https://desdaemon.github.io",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/typed-htmx/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "Desdaemon", // Usually your GitHub org/user name.
	projectName: "typed-htmx", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "ignore",

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	plugins: [
		[
			"docusaurus-plugin-typedoc",
			/** @type {Partial<import('docusaurus-plugin-typedoc').PluginOptions>} */
			({
				entryPoints: ["../src/index.ts", "../src/jsx.d.ts"],
				tsconfig: "../tsconfig.json",
				readme: "none",
				hideInPageTOC: true,
				watch: process.env.npm_lifecycle_event === "start",
				// cleanOutputDir: process.env.NODE_ENV !== 'production',
				cleanOutputDir: false,
				excludeExternals: true,
				externalPattern: ["node_modules/**/*"],
				plugin: ["typedoc-plugin-mdn-links"],
			}),
		],
	],

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					//   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				// blog: {
				//   showReadingTime: true,
				//   // Please change this to your repo.
				//   // Remove this to remove the "edit this page" links.
				//   editUrl:
				//     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				// },
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
		[
			"docusaurus-preset-shiki-twoslash",
			{
				themes: ["min-light", "nord"],
				tsModule: require("typescript"),
				defaultOptions: {
					noErrors: false,
				},
				defaultCompilerOptions: {
					types: ["typed-htmx"],
					jsx: "react-jsx",
					jsxImportSource: "typed-htmx/typed-html",
					target: "esnext",
					strict: true,
					noImplicitAny: false,
					moduleResolution: 99, // nodenext
				},
				includeJSDocInHover: true,
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: "img/docusaurus-social-card.jpg",
			navbar: {
				title: "typed-htmx",
				logo: {
					alt: "My Site Logo",
					src: "img/logo.svg",
				},
				items: [
					{
						type: "docSidebar",
						sidebarId: "docsSidebar",
						position: "left",
						label: "Usage",
					},
					{
						type: "docSidebar",
						sidebarId: "referenceSidebar",
						position: "left",
						label: "Reference",
					},
					{
						href: "https://github.com/Desdaemon/typed-htmx",
						label: "GitHub",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "Docs",
						items: [
							{
								label: "Usage",
								to: "/docs/howto/intro",
							},
							{
								label: "Reference",
								to: "/docs/api",
							},
						],
					},
					// {
					//   title: 'Community',
					//   items: [
					//     {
					//       label: 'Stack Overflow',
					//       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
					//     },
					//     {
					//       label: 'Discord',
					//       href: 'https://discordapp.com/invite/docusaurus',
					//     },
					//     {
					//       label: 'Twitter',
					//       href: 'https://twitter.com/docusaurus',
					//     },
					//   ],
					// },
					// {
					//   title: 'More',
					//   items: [
					//     {
					//       label: 'Blog',
					//       to: '/blog',
					//     },
					//     {
					//       label: 'GitHub',
					//       href: 'https://github.com/facebook/docusaurus',
					//     },
					//   ],
					// },
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
