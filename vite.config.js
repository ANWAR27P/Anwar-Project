import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // إجبار المترجم على تخطي مشاكل الـ parser وتحقيق التوافق التام
      babel: {
        parserOpts: {
          plugins: ['jsx', 'decorators-legacy']
        }
      }
    })
  ],
});