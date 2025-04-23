import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:4000/graphql',
  documents: './rtk/service/graphql/**/*.graphql',
  generates: {
    './rtk/service/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          'typescript-rtk-query': {
            importBaseApiFrom: './baseApi',
            exportHooks: true,
            overrideExisting: true,
          },
        },
      ],
    },
    'config./graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
export default config;
