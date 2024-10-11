
const superagent = require('superagent').agent();
//https://www.airservicesaustralia.com/naips/Account/LogOn
const naips = async () => {
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

    console.log(areaBriefing.text);
}

naips();