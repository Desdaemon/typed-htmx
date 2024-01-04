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
	baseUrl: "/typed-htmx/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "Desdaemon", // Usually your GitHub org/user name.
	projectName: "typed-htmx", // Usually your repo name.

	markdown: {
		format: 'md'
	},
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",

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
				hideInPageTOC: true,
				readme: 'none',
				watch: process.env.npm_lifecycle_event === "start",
				cleanOutputDir: true,
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
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},

			}),
		],
		[
			"docusaurus-preset-shiki-twoslash",
			/** @type {Partial<import('remark-shiki-twoslash').Options>} */
			({
				themes: ["min-light", "nord"],
				defaultOptions: {
					noErrors: false,
				},
				defaultCompilerOptions: {
					jsx: 4, // react-jsx
					jsxImportSource: 'typed-htmx/typed-html',
					target: 99, // esnext,
					strict: true,
					checkJs: true,
					noImplicitAny: false,
					module: 199, // nodenext,
					moduleResolution: 99, // nodenext
				},
				includeJSDocInHover: true,
				alwayRaiseForTwoslashExceptions: true,
				disableImplicitReactImport: true,
			}),
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
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
