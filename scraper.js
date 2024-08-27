const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeJobPostings() {
    const url = 'https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch';

    try {
        // Fetch the HTML of the page
        const { data } = await axios.get(url);

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Select the job postings container
        const jobPostings = [];

        // Assuming each job posting is in a specific class or tag
        $('.jobTuple').each((index, element) => {
            const jobTitle = $(element).find('.title').text().trim();
            const companyName = $(element).find('.subTitle').text().trim();
            const location = $(element).find('.location').text().trim();
            const jobType = $(element).find('.jobType').text().trim(); // Update the selector as per the site structure
            const postedDate = $(element).find('.jobTupleFooter .postedDate').text().trim();
            const jobDescription = $(element).find('.job-description').text().trim();

            // Push the extracted data into the jobPostings array
            jobPostings.push({
                jobTitle,
                companyName,
                location,
                jobType,
                postedDate,
                jobDescription
            });
        });

        console.log(jobPostings);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

scrapeJobPostings();
