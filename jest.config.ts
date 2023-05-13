import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	transformIgnorePatterns: ['node_modules/(?!my-module-to-ignore)'],
};

export default config;
