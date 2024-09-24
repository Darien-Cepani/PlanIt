module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					light: "#4da6ff",
					DEFAULT: "#0080ff",
					dark: "#0066cc",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
