import { test, expect, Page, Locator } from '@playwright/test';

type JobDetails = {
  title: string;
  location: string;
  id: string;
};

// async function extractJobDetails(jobInfo: Locator): Promise<JobDetails> {
//   return {
//     title: await jobInfo.getAttribute('data-ph-at-job-title-text') ?? '',
//     location: await jobInfo.getAttribute('data-ph-at-job-location-text') ?? '',
//     category: await jobInfo.getAttribute('data-ph-at-job-category-text') ?? '',
//     id: await jobInfo.getAttribute('data-ph-at-job-id-text') ?? '',
//     type: await jobInfo.getAttribute('data-ph-at-job-type-text') ?? '',
//   };
// }

test('Validate Job Search Results and Details', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Careers', exact: true }).click();

  const jobSearchBox = page.getByPlaceholder('Search job title or location');
  await jobSearchBox.fill('Senior Automation and Robotics Software Engineer');
  await jobSearchBox.press('Enter');

  await expect(page.locator('[class$="results-block"]')).toBeVisible();

  const resultsList = page.locator('.jobs-list-item').getByRole('link', { name: 'Software Engineer' });
  await resultsList.first().click();

  const jobInfo = page.locator('div.job-info');
  const jobTitle = await jobInfo.getAttribute('data-ph-at-job-title-text');
  const jobId = await jobInfo.getAttribute('data-ph-at-job-id-text');
  const locationText = await page.locator('.job-description p:has-text("Location:")').textContent();
//   console.log(locationText);
  const jobLocation = locationText?.replace('Location:', '').trim();

  const jobDetails = {title: jobTitle, location: jobLocation, id: jobId};

  const expectedJob: JobDetails = {
    title: 'Senior Automation and Robotics Software Engineer',
    location: 'Bloomfield, CT',
    id: '2512136',
  };

  expect(jobDetails).toEqual(expectedJob);

  const jobDescription = page.locator('.job-description');
  const skillsSectionHeading = jobDescription.locator('p:has-text("Skills/Knowledge/Educational Requirements:")')
  await expect(skillsSectionHeading).toBeVisible();

  const skillsSectionBullets = page.locator('p:has-text("Skills/Knowledge/Educational Requirements:") + ul li');
  const skillsBullet2Text = await skillsSectionBullets.nth(2).textContent();
  expect(skillsBullet2Text).toContain('Experience with Java and/or another object-oriented language');

  const dutiesSectionHeading = jobDescription.locator('p:has-text("Duties/Responsibilities:")')
  await expect(dutiesSectionHeading).toBeVisible();
  const dutiesSectionBullets = page.locator('p:has-text("Duties/Responsibilities:") + ul li')
  const dutiesBullet3Text = await dutiesSectionBullets.nth(0).textContent();
  expect(dutiesBullet3Text).toContain('Design/develop/support application software for automation equipment');

  const allParagraphs = page.locator('.jd-info p:not([aria-hidden="true"])');
  const rawText = await allParagraphs.allTextContents();
  const cleanParagraphs = rawText.map(text => text.trim()).filter(text => text.length > 0);
  expect(cleanParagraphs[3]).toContain('We are seeking a Senior Automation and Robotics Software Engineer');

  const benefitsSectionText = await page.locator('.jd-info p:has-text("Benefits:")').textContent();
  const benefits = benefitsSectionText?.replace('Benefits:', '').trim();
  expect(benefits).toContain('Medical, Dental, Vision, Life, STD/LTD, 401(k)');

  const [workDayPage] = await Promise.all([
    page.waitForEvent('popup'),
    await page.getByRole('button', { name: 'Apply Now' }).click(),
  ]);

  const workDayPageUrl = workDayPage.url();
  expect(workDayPageUrl).toContain('myworkdayjobs');

  await expect(workDayPage.locator('[data-automation-id="logoLink"]')).toBeVisible()
//   await workDayPage.waitForTimeout(5000);
//   const workDayPageTitle = await workDayPage.title();()
//   console.log(workDayPageTitle);
//   expect(workDayPageTitle).toContain('Senior Automation and Robotics Software Engineer');

await workDayPage.getByRole('button', {name: 'Autofill with Resume'}).click();

await workDayPage.locator('[data-automation-id="backToJobPosting"]').click();

const jobIdWdPage = await workDayPage.locator('[data-automation-id="requisitionId"]').textContent();
console.log(jobIdWdPage);
expect(jobIdWdPage).toContain(jobId);

const jobLocationWdPage = await workDayPage.locator('[data-automation-id="jobPostingDescription"] p:has-text("Location:")').textContent();
console.log(jobLocationWdPage);
expect(jobLocationWdPage).toContain(jobLocation);

await workDayPage.locator('[data-automation-id="logo"][alt="careers"]').click();
await expect(workDayPage).toHaveURL(/.*careers\.labcorp\.com.*/);

});
