import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // ── Paths ESLint should never lint ─────────────────────────────────────────
  {
    ignores: [
      'dist',
      'node_modules',
      'public',
      '*.min.js',
    ],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    extends: [
      // Enables ESLint's core recommended ruleset (catches common JS mistakes)
      js.configs.recommended,
      // Enables recommended React rules (e.g. no missing keys, no unknown DOM props)
      react.configs.flat.recommended,
      // Enables the new JSX transform rules — no need to `import React` in every file
      react.configs.flat['jsx-runtime'],
      // Enforces hooks rules: only call hooks at the top level, inside React functions
      reactHooks.configs.flat
        .recommended,
      // Warns about components that can't be safely fast-refreshed by Vite HMR
      reactRefresh.configs.vite,
      // Enables accessibility rules — flags missing alt text, wrong ARIA usage, etc.
      jsxA11y.flatConfigs.recommended,
      // MUST BE LAST — turns off all ESLint formatting rules so Prettier owns formatting
      prettierConfig,
    ],

    plugins: {
      // Register eslint-plugin-prettier so the 'prettier/prettier' rule is available
      prettier,
      // Register eslint-plugin-unicorn for file naming conventions and extra quality rules
      unicorn,
    },

    languageOptions: {
      parser: tseslint.parser,
      // Use the latest ECMAScript syntax (ES2024+)
      ecmaVersion: 'latest',
      // Treat every file as an ES module (enables import/export)
      sourceType: 'module',
      globals: {
        // Inject browser globals: window, document, fetch, localStorage, etc.
        ...globals.browser,
        // Inject ES2021 globals: globalThis, Promise.any, WeakRef, etc.
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          // Enable JSX syntax parsing
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        // Pin the React version so the plugin doesn't try to auto-detect it
        // (auto-detect breaks with ESLint 10 due to a changed context API)
        version: '19.2.6',
      },
    },

    rules: {
      // ── Prettier ────────────────────────────────────────────────────────────
      // Show Prettier formatting violations as ESLint warnings (not errors)
      'prettier/prettier': 'warn',

      // ── React ───────────────────────────────────────────────────────────────
      // PropTypes validation is not needed in plain JS projects (and irrelevant with TS)
      'react/prop-types': 'off',
      // Warn when a component function or class has no displayName (helps in DevTools)
      'react/display-name': 'warn',
      // Prefer <Component /> over <Component></Component> when there are no children
      'react/self-closing-comp': 'warn',
      // Omit ={true} on boolean props — write <Modal open> not <Modal open={true}>
      'react/jsx-boolean-value': [
        'warn',
        'never',
      ],
      // Warn on <></> or <Fragment> wrapping a single child — just return the child directly
      'react/jsx-no-useless-fragment':
        'warn',
      // Remove unnecessary curly braces: use prop="text" not prop={"text"}
      'react/jsx-curly-brace-presence':
        [
          'warn',
          {
            props: 'never',
            children: 'never',
          },
        ],

      // ── General JS ──────────────────────────────────────────────────────────
      // Disallow console.log in production code; allow console.warn and console.error
      'no-console': [
        'warn',
        { allow: ['warn', 'error'] },
      ],
      // Warn on declared but unused variables; prefix with _ to intentionally ignore
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Prefer const over let when the variable is never reassigned
      'prefer-const': 'warn',
      // Never use var — use const or let instead
      'no-var': 'error',
      // Use shorthand method/property syntax: { foo } not { foo: foo }, { fn() {} } not { fn: function() {} }
      'object-shorthand': 'warn',
      // Always use === / !== instead of == / != to avoid type coercion bugs
      eqeqeq: ['error', 'always'],
      // Error when the same module is imported more than once — merge into one import
      'no-duplicate-imports': 'error',
      // Warn when an inner variable shadows an outer one — prevents confusing bugs
      'no-shadow': 'warn',
      // Disallow nested ternaries: a ? b ? c : d : e — use if/else or extract a variable
      'no-nested-ternary': 'error',
      // Require a space after // or /* so comments are readable: // comment not //comment (except for TS triple-slash directives)
      'spaced-comment': [
        'warn',
        'always',
        { markers: ['/'] },
      ],

      // ── React hooks ─────────────────────────────────────────────────────────
      // Allow exporting constants like buttonVariants alongside components
      'react-refresh/only-export-components':
        [
          'warn',
          { allowConstantExport: true },
        ],
      // Enforce [value, setValue] naming convention for useState pairs
      'react/hook-use-state': 'warn',
      // Prevent `{count && <Comp />}` rendering "0" — force `{count > 0 && <Comp />}`
      'react/jsx-no-leaked-render': [
        'error',
        {
          validStrategies: [
            'coerce',
            'ternary',
          ],
        },
      ],

      // ── File & identifier naming (unicorn) ───────────────────────────────────
      // Components → PascalCase (Button.jsx), hooks/utils → camelCase (useAuth.js)
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true, // React components: MyComponent.jsx
            camelCase: true, // hooks, utils, helpers: useAuth.js, formatDate.js
          },
          ignore: [
            /^vite\.config/, // vite.config.js
            /^eslint\.config/, // eslint.config.js
            /^tailwind\.config/, // tailwind.config.js
            /^vite-env\.d\.ts/, // vite-env.d.ts
          ],
        },
      ],
    },
  },

  // ── TypeScript Specific Rules ──────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    rules: {
      // Disable base no-unused-vars rule for TS files to let TS compiler handle it
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars':
        [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
    },
  },
)
