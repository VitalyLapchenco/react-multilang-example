# React-typescript template

## Important !!!
**All keys of `path` object in `scripts/config.js` should be settled**

## npm scripts

To run in `dev` mode with hotreload on `localhost`:
```bash
  npm run dev-server
```

To run in `dev` mode watch only:
```bash
  npm run dev
```

To build in `dev` mode:
```bash
  npm run dev-build
```

To build in `prod` mode:
```bash
  npm run prod-build
```

To view how much any project module consumes  space in `dev` mode:
```bash
  npm run dev-build-analyze
```

To view how much any project module consumes  space in `prod` mode:
```bash
  npm run prod-build-analyze
```

To fix files with `eslint`:
```bash
  npm run eslint-fix
```

To run tests:
```bash
  npm run test
```

To run tests in watch mode:
```bash
  npm run test:watch
```

To view test coverage:
```bash
  npm run test:coverage
```

## Features:
- [hot module replacement](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- preconfigured [redux](https://redux.js.org/)
- preconfigured [eslint](https://eslint.org/) with [autosort imports](https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping)
- visually manage project dependencies with [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

## Variables available globally in react application
- __DEV\_\_ - equals `true` if `mode === 'development'`
- __PROD\_\_ - equals `true` if `mode === 'production'`

## libs/plugins FAQ
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) rules description
- [configuring eslint in phpstorm](https://www.jetbrains.com/help/phpstorm/eslint.html#ws_js_eslint_manual_configuration)
- [eslint-plugin-simple-import-sort options](https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping)

## IDE (PhpStorm/WebStorm) config
- webpack
  1. go to *your JetBrains IDE settings* -> *Languages & Frameworks* -> *Webpack*<br />
  3. check `Manually` radio button and specify absolute path to `webpack.common.config.js`
- eslint
  1. go to *your JetBrains IDE settings* -> *Languages & Frameworks* -> *Javascript* -> *Code Quality Tools* -> *ESLint*<br />
  2. check `Manual ESLint configuration` radio button
  3. in `ESLint package` field specify absolute path to `<your_app>/node_modules/eslint`
  4. in `Working directories` field specify absolute path to project `<your_app>/src` folder
  5. in `Configuration file` field specify absolute path to project `<your_app>/.eslintrc.js`
  6. in `Run for files` field specify glob pattern `{**/*,*}.{js,ts,jsx,tsx,html,vue}`
  7. set checkmark in `Run eslint --fix on save` filed

## Folder structure
```
├── __mocks__
│   └── fileMock.js
├── public
│   └── index.html
├── scripts
│   ├── config.js —— file should be changed after clone to your project
│   ├── config.utils.js
│   ├── webpack.common.config.js
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js
├── src
│   ├── assets
│   │   ├── images —— folder for common images
│   │   └── styles —— folder for common styles
│   │       └── index.scss
│   ├── components
│   │   ├── App
│   │   │   ├── App.module.scss
│   │   │   ├── App.tsx —— "presentational" component, responsible generally only for rendering
│   │   │   ├── App.container.tsx —— opinionated, contains business component logic with most amount of features, prefer this file over "src/contaienr" fodler
│   │   │   ├── types.ts —— opinionated, if App.container.tsx containes more than 2 declared interfaces/types
│   │   │   ├── __tests__
│   │   │   │   └── App.test.tsx
│   │   │   └── index.tsx —— contains "export * from './App.container'"
│   │   └── UI —— folder for reusable components
│   ├── constants
│   ├── containers —— opinionated folder, prefer "hooks" over container components
│   ├── global.d.ts —— typescript types/interfaces accesible over project
│   ├── hooks
│   ├── index.tsx
│   ├── pages
│   ├── setupTests.ts
│   ├── store
│   │   ├── SomeFeature
│   │   │   ├── actionCreators.ts
│   │   │   ├── actionTypes.ts
│   │   │   ├── reduser.ts
│   │   │   └── types.ts
│   │   ├── index.ts
│   │   └── rootReducer.ts
│   ├── styles.d.ts
│   ├── types —— common project types related to project domain
│   └── utils —— common utils
│       ├── __tests__
│       │   └── methods.test.ts
│       └── methods.ts
└── tsconfig.json
```