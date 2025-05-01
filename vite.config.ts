import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
    base: '/Page404/',
    plugins: [
        eslint()
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer({})
            ]
        },
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    build: {
        minify: true,
        emptyOutDir: true,
        outDir: resolve(__dirname, 'dist'),
        lib: {
            entry: resolve(__dirname, 'src/ts/main.js'),
            name: 'page404',
            fileName: (format) => `script.${format}.js`
        },
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
            output: {
                inlineDynamicImports: true,
                entryFileNames: `script.[format].js`,
                assetFileNames: ({ names }:any) => {
                    if (/\.css$/.test(names[0] ?? '')) {
                        return 'style.min.css';
                    }else{
                        return '[name].[ext]'
                    }
                }
            }
        }
    }
})