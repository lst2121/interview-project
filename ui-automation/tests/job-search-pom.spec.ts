import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { JobSearchPage } from '../pages/JobSearchPage';
import { WorkDayPage } from '../pages/WorkDayPage';

interface JobDetails {
    title: string | null;
    location: string | undefined;
    id: string | null;
}

test('Test Job Search and Application Process', async ({ page }) => {
    const homePage = new HomePage(page);
    const jobSearchPage = new JobSearchPage(page);

    await homePage.goToHomePage();
    await homePage.clickCareersLink();

    await jobSearchPage.searchForJob('Senior Automation and Robotics Software Engineer');
    await jobSearchPage.waitForResults();

    await jobSearchPage.clickFirstJob();

    const jobDetails: JobDetails = {
        title: await jobSearchPage.getJobTitle(),
        location: await jobSearchPage.getJobLocation(),
        id: await jobSearchPage.getJobId()
    };

    console.log('Job ID:', jobDetails.id);
    console.log('Job Location:', jobDetails.location);

    const expectedJob: JobDetails = {
        title: 'Senior Automation and Robotics Software Engineer',
        location: 'Bloomfield, CT',
        id: '2512136'
    };

    expect(jobDetails).toEqual(expectedJob);

    const skillsText = await jobSearchPage.checkSkillsSection();
    expect(skillsText).toContain('Experience with Java and/or another object-oriented language');

    const dutiesText = await jobSearchPage.checkDutiesSection();
    expect(dutiesText).toContain('Design/develop/support application software for automation equipment');

    const descriptionText = await jobSearchPage.checkJobDescription();
    expect(descriptionText).toContain('We are seeking a Senior Automation and Robotics Software Engineer');

    const benefitsText = await jobSearchPage.checkBenefitsSection();
    expect(benefitsText).toContain('Medical, Dental, Vision, Life, STD/LTD, 401(k)');

    const [workDayPage] = await Promise.all([
        page.waitForEvent('popup'),
        jobSearchPage.clickApplyButton(),
    ]);

    const workDayPageObj = new WorkDayPage(workDayPage);
    await workDayPageObj.waitForPageToLoad();

    const isWorkDayPage = await workDayPageObj.checkIfWorkDayPage();
    expect(isWorkDayPage).toBe(true);

    await workDayPageObj.clickAutofillButton();
    await workDayPageObj.clickBackToJobButton();

    const workDayJobId = await workDayPageObj.getJobIdFromPage();
    console.log('Job ID on WorkDay page:', workDayJobId);
    expect(workDayJobId).toEqual(jobDetails.id);

    const workDayLocation = await workDayPageObj.getLocationFromPage();
    console.log('Location on WorkDay page:', workDayLocation);
    expect(workDayLocation).toEqual(jobDetails.location);

    await workDayPageObj.clickCareersLogo();
    const isCareersPage = await workDayPageObj.checkIfCareersPage();
    expect(isCareersPage).toBe(true);
}); 