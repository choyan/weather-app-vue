import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  ...pluginQuery.configs["flat/recommended"],
];
