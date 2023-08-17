export default {
	transform: {
		"^.+\\.(t|j)sx?$": [
			"@swc/jest",
			{
				// Jest doesn't understand ESM yet.
				module: { type: "commonjs" },
				jsc: {
					target: "esnext",
					parser: {
						syntax: "typescript",
						tsx: true,
					},
					experimental: {
						plugins: [
							[
								"swc-plugin-static-jsx",
								{
									template: "html",
									importSource: "typed-htmx",
								},
							],
						],
					},
				},
			},
		],
	},
};
