import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// Next 16's eslint-config-next ships native flat configs (arrays), so we spread
// them directly. Using FlatCompat.extends() here crashed ESLint 9 with
// "Converting circular structure to JSON" during config validation.
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
