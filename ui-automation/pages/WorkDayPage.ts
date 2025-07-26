import { Page } from '@playwright/test';

export class WorkDayPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageToLoad() {
        await this.page.locator('[data-automation-id="logoLink"]').waitFor({ state: 'visible' });
    }

    async checkIfWorkDayPage() {
        const url = this.page.url();
        return url.includes('myworkdayjobs');
    }

    async clickAutofillButton() {
        await this.page.getByRole('button', { name: 'Autofill with Resume' }).click();
    }

    async clickBackToJobButton() {
        await this.page.locator('[data-automation-id="backToJobPosting"]').click();
    }

    async getJobIdFromPage() {
        const jobIdText = await this.page.locator('[data-automation-id="requisitionId"]').textContent();
        return jobIdText?.replace('job requisition id', '').trim();
    }

    async getLocationFromPage() {
        const locationText = await this.page.locator('[data-automation-id="jobPostingDescription"] p:has-text("Location:")').textContent();
        return locationText?.replace('Location:', '').trim();
    }

    async clickCareersLogo() {
        await this.page.locator('[data-automation-id="logo"][alt="careers"]').click();
    }

    async checkIfCareersPage() {
        const url = this.page.url();
        return url.includes('careers.labcorp.com');
    }
} 