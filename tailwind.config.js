import tokens from "./src/tokens";

module.exports = {
  darkMode: ["selector", '[zaui-theme="dark"]'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./index.html",
  ],
  theme: {
    extend: {
      ...tokens,
    },
  },
};
