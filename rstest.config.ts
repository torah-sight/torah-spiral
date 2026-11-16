import {defineConfig} from '@rstest/core';

export default defineConfig({
    include: ['tests/**/*.test.ts'],
    testEnvironment: 'node',
    source: {decorators: {version: '2023-11'}}
});
