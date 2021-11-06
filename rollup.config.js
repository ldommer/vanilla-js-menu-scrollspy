import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default [
    {
        input: 'src/menu-scrollspy.js',
        output: [
            {
                file: 'dist/menu-scrollspy.amd.js',
                format: 'amd',
            },
            {
                file: 'dist/menu-scrollspy.amd.min.js',
                format: 'amd',
                plugins: [terser()],
            },
            {
                file: 'dist/menu-scrollspy.iife.js',
                format: 'iife',
                name: 'MenuScrollspy',
            },
            {
                file: 'dist/menu-scrollspy.iife.min.js',
                format: 'iife',
                name: 'MenuScrollspy',
                plugins: [terser()],
            },
            {
                file: 'dist/menu-scrollspy.js',
                format: 'umd',
                name: 'MenuScrollspy',
            },
            {
                file: 'dist/menu-scrollspy.min.js',
                format: 'umd',
                name: 'MenuScrollspy',
                plugins: [terser()],
            },
        ],
        plugins: [
            resolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
            }),
        ],
    },
    {
        input: 'src/menu-scrollspy.js',
        output: [
            {
                file: 'dist/menu-scrollspy.esm.js',
                format: 'esm',
            },
            {
                file: 'dist/menu-scrollspy.esm.min.js',
                format: 'esm',
                plugins: [terser()],
            },
        ],
    },
];
