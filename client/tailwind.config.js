/** @type {import('tailwindcss').Config} */
export const content = ["./**/*.php", "../Resources/**/*.{html,js}"];
export const safelist = [
  "tw-bg-blue-800/75",
  {
    pattern: /(bg|text)-(blue)-(800)/,
    variants: ["hover"],
  },
];
export const prefix = "tw-";
export const theme = {
  extend: {},
};
export const corePlugins = {
  preflight: false,
};
export const plugins = [];
