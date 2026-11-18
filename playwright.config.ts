import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'].find(path => existsSync(path));
const port = process.env['TEST_PORT'] ?? '4321';
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 2, retries: process.env['CI'] ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: `http://127.0.0.1:${port}`, locale: 'it-IT', trace: 'retain-on-failure', screenshot: 'only-on-failure', launchOptions: chrome ? { executablePath: chrome } : {} },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: `npm run preview -- --port ${port}`, url: `http://127.0.0.1:${port}`, reuseExistingServer: !process.env['CI'], timeout: 30000 },
});
