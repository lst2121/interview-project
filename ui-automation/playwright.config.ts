import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    testMatch: /.*\.spec\.ts/,
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
        baseURL: 'https://www.labcorp.com',
    },
    fullyParallel: true,
    workers: 1,
    reporter: [
        ['html', { 
            outputFolder: 'playwright-report',
            open: 'never'
        }]
    ],

    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
            },
        },
    ],
});