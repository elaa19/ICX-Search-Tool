const https = require('https');

const query = `
  query {
    allOpportunity(filters: { committee: 891, programmes: [7] }, per_page: 1) {
      data {
        id
        logistics_info {
          accommodation_covered
          accommodation_provided
        }
        specifics_info {
          salary
        }
      }
    }
  }
`;

const req = https.request({
  hostname: 'gis-api.aiesec.org',
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '4mPH5hJxjRySo_gV_GZjA0rqU8ymrf7kF-2yYaRk83Y'
  }
}, (res) => {
  let body = '';
  res.on('data', c => { body += c; });
  res.on('end', () => console.log(body));
});
req.write(JSON.stringify({ query }));
req.end();
