import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Enable React optimization for production
      babel: {
        plugins: mode === 'production' ? [
          ['babel-plugin-react-remove-properties', { properties: ['data-testid'] }]
        ] : []
      }
    }),
    // Bundle analyzer (only in analysis mode)
    mode === 'analyze' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  
  base: '/',
  
  // Optimized build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development',
    emptyOutDir: true,
    
    // Advanced minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : []
      },
      mangle: {
        safari10: true
      }
    },
    
    // Optimized chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // UI libraries
            if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'ui-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // App chunks
          if (id.includes('src/pages')) {
            return 'pages';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
        },
        
        // Optimized file naming
        entryFileNames: (chunkInfo) => {
          return `assets/${chunkInfo.name}-[hash].js`;
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop()?.replace(/\.[^/.]+$/, '') : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].[ext]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        }
      },
      
      // External dependencies (if needed)
      external: [],
    },
    
    // Build targets for modern browsers
    target: ['es2020', 'chrome80', 'safari13', 'firefox78'],
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Asset inlining threshold
    assetsInlineLimit: 4096,
    
    // Report compressed size
    reportCompressedSize: true,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    cors: true,
    strictPort: false,
    // HMR configuration
    hmr: {
      port: 5174,
    }
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
    cors: true,
    strictPort: false
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'zod'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@config': '/src/config',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@services': '/src/services'
    }
  }
}));