import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToHomePage() {
        await this.page.goto('/');
    }

    async clickCareersLink() {
        await this.page.getByRole('link', { name: 'Careers', exact: true }).click();
    }
} 