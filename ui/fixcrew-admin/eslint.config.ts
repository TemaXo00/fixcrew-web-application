import antfu from '@antfu/eslint-config'
import checkFile from 'eslint-plugin-check-file'

export default antfu(
  {
    ignores: [
      '**/public/**/*',
      '**/*.md',
      '**/components/shad-cn/ui/**/*',
      '**/lib/utils.ts',
      '**/*.json',
      '**/*.d.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['destructured'],
          format: null,
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'variable',
          filter: {
            regex: '^use[A-Z]',
            match: true,
          },
          format: ['camelCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          suffix: ['Type'],
        },
        {
          selector: 'interface',
          filter: {
            regex: 'Props$',
            match: true,
          },
          format: ['PascalCase'],
          suffix: ['Props'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          suffix: ['Enum'],
        },
        {
          selector: 'interface',
          filter: {
            regex: 'DTO$',
            match: true,
          },
          format: ['PascalCase'],
          suffix: ['DTO'],
        },
        {
          selector: 'interface',
          filter: {
            regex: 'State$',
            match: true,
          },
          format: ['PascalCase'],
          suffix: ['State'],
        },
        {
          selector: 'interface',
          filter: {
            regex: 'Params$',
            match: true,
          },
          format: ['PascalCase'],
          suffix: ['Params'],
        },
        {
          selector: 'interface',
          filter: {
            regex: 'Response$',
            match: true,
          },
          format: ['PascalCase'],
          suffix: ['Response'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: false,
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 },
          multiline: { max: 1 },
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/html-indent': [
        'error',
        4,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
    },
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error'],
      'antfu/top-level-function': 'off',
      'func-style': ['error', 'expression'],
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      'node/prefer-global/process': 'off',
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-debugger': 'error',
      'max-len': ['error', { code: 900 }],
    },
  },
  {
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*.{ts,vue}': 'KEBAB_CASE',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/!({*.{config,global}),[id]}.{js,ts,vue}': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'max-len': 'off',
    },
  },
)
