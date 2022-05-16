# Migration existing SeaRates projects

1. Replace your `webpack | scripts` folder with `scripts` folder from this repo.
2. Update `paths` object in `./scripts/config.js` according to your projects preferences.
3. Update `alias` object in `./scripts/config.js` and `paths` option in `tsconfig.json` according to your projects preferences.
4. Copy `.editorconfig`, `.babelrc.js`, `.eslintignore`, `.eslintrc.js`, `.prettierrc.js`, `tsconfig.json` into your app folder.
5. Copy `./src/global.d.ts` into your `src` folder.
6. Merge this repo's `package.json` dependencies with your `package.json` manually.
7. Replace `eslint` rules, that causes issues with rules in comments in `.eslintrc.js` (better to leave as is and refactor your project)