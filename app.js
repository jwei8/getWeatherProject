const superagent = require('superagent').agent();
const cheerio = require('cheerio');
const express = require('express');
//https://www.airservicesaustralia.com/naips/Account/LogOn

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

async function getBriefingData() {
    let dashboard = await superagent
    .post('https://www.airservicesaustralia.com/naips/Account/LogOn')
    .send({ username: 'baenaips', password: '8209fta' })
    .set('Content-Type', 'application/x-www-form-urlencoded');
    //console.log(dashboard.text);

    let areaBriefing = await superagent
    .post('https://www.airservicesaustralia.com/naips/Briefing/Area')
    .send({ BriefingArea1: '9500',
            BriefingArea2: '',
            BriefingArea3: '',
            BriefingArea4: '',
            BriefingArea5: '',
            Met: 'true',
            Notam: 'true',
            HeadOfficeNotam: 'false',
            Charts: 'true',
            MidSigwxGpwt: 'false',
            GPWTRegionalCharts: 'true',
            GPWTRegionalCharts: 'false',
            ChartVariant: 'HI',
            GPWTNationalCharts: 'false',
            Validity: '24'
    })
    .set('Content-Type', 'application/x-www-form-urlencoded');
     // Load the HTML into cheerio
     const $ = cheerio.load(areaBriefing.text);

     // Extract the content inside the <pre> tag with class "briefing"
     const briefingData = $('pre.briefing').text();
     //console.log(briefingData);
     return briefingData;
}

app.get('/', async (req, res) => {
    try {
        const briefingData = await getBriefingData(); // Fetch the data
        console.log(briefingData);
        res.render('index', { briefingData }); // Render the index.ejs file with data
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});