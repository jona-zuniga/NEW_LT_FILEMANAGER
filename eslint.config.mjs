import nextVitals from 'eslint-config-next/core-web-vitals'

import {defineConfig, globalIgnores} from 'eslint/config'
 
const eslintConfig = defineConfig([

	...nextVitals,

	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

	{

		files: ['**/*.js', '**/*.jsx'],

		rules: {

			'no-undef': 'error',

			'no-unused-vars': 'error',

		},

	},

])
 
export default eslintConfig