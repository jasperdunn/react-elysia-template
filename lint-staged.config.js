export default {
  '**/*': ['biome check --write'],
  '**/*.ts?(x)': [() => 'bun run tsc', () => 'bun run test'],
};
