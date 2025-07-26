import { Page } from '@playwright/test';

export class JobSearchPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async searchForJob(jobTitle: string) {
        const searchBox = this.page.getByPlaceholder('Search job title or location');
        await searchBox.fill(jobTitle);
        await searchBox.press('Enter');
    }

    async waitForResults() {
        await this.page.locator('[class$="results-block"]').waitFor({ state: 'visible' });
    }

    async clickFirstJob() {
        const jobLinks = this.page.locator('.jobs-list-item').getByRole('link', { name: 'Software Engineer' });
        await jobLinks.first().click();
    }

    async getJobTitle() {
        const jobInfo = this.page.locator('div.job-info');
        return await jobInfo.getAttribute('data-ph-at-job-title-text');
    }

    async getJobId() {
        const jobInfo = this.page.locator('div.job-info');
        return await jobInfo.getAttribute('data-ph-at-job-id-text');
    }

    async getJobLocation() {
        const locationText = await this.page.locator('.job-description p:has-text("Location:")').textContent();
        return locationText?.replace('Location:', '').trim();
    }

    async checkSkillsSection() {
        const skillsHeading = this.page.locator('.job-description p:has-text("Skills/Knowledge/Educational Requirements:")');
        await skillsHeading.waitFor({ state: 'visible' });
        
        const skillsText = await this.page.locator('p:has-text("Skills/Knowledge/Educational Requirements:") + ul li').nth(2).textContent();
        return skillsText;
    }

    async checkDutiesSection() {
        const dutiesHeading = this.page.locator('.job-description p:has-text("Duties/Responsibilities:")');
        await dutiesHeading.waitFor({ state: 'visible' });
        
        const dutiesText = await this.page.locator('p:has-text("Duties/Responsibilities:") + ul li').nth(0).textContent();
        return dutiesText;
    }

    async checkBenefitsSection() {
        const benefitsText = await this.page.locator('.jd-info p:has-text("Benefits:")').textContent();
        return benefitsText?.replace('Benefits:', '').trim();
    }

    async checkJobDescription() {
        const paragraphs = this.page.locator('.jd-info p:not([aria-hidden="true"])');
        const allText = await paragraphs.allTextContents();
        const cleanText = allText.map(text => text.trim()).filter(text => text.length > 0);
        return cleanText[3];
    }

    async clickApplyButton() {
        await this.page.getByRole('button', { name: 'Apply Now' }).click();
    }
} 