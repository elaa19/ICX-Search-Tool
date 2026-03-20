const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'gis-api.aiesec.org';
const TOKEN = '4mPH5hJxjRySo_gV_GZjA0rqU8ymrf7kF-2yYaRk83Y';

const query = `
  query {
    allOpportunity(filters: { committee: 891, programmes: [7] }) {
      data {
        id
        title
        openings
        location
        available_slots {
          start_date
          end_date
        }
        logistics_info {
          accommodation_covered
          accommodation_provided
        }
      }
    }
  }
`;

const req = https.request({
  hostname: API_URL,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': TOKEN
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    try {
      const result = JSON.parse(body);
      
      if (!result.data || !result.data.allOpportunity || !result.data.allOpportunity.data) {
        console.error("Failed to extract data:", JSON.stringify(result, null, 2));
        return;
      }
      
      const data = result.data.allOpportunity.data;

      const dataDir = path.join(__dirname, 'src', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // 1. Save JSON
      fs.writeFileSync(path.join(dataDir, 'opps_data.json'), JSON.stringify(data, null, 2));

      // 2. Save CSV
      let csv = 'id,title,openings,location,start_date,end_date,acc_provided,acc_covered\n';
      data.forEach(opp => {
        const id = opp.id || '';
        const title = (opp.title || '').replace(/"/g, '""'); // Escape quotes for CSV
        const openings = opp.openings || 0;
        const location = (opp.location || '').replace(/"/g, '""');
        let startDate = '';
        let endDate = '';
        if (opp.available_slots && opp.available_slots.length > 0) {
          startDate = opp.available_slots[0].start_date || '';
          endDate = opp.available_slots[0].end_date || '';
        }
        const accProv = opp.logistics_info?.accommodation_provided || '';
        const accCov = opp.logistics_info?.accommodation_covered || '';
        // Properly quote strings
        csv += `"${id}","${title}",${openings},"${location}","${startDate}","${endDate}","${accProv}","${accCov}"\n`;
      });
      fs.writeFileSync(path.join(dataDir, 'opps_data.csv'), csv);

      // 3. Save DB (.sql dump)
      let sql = 'CREATE TABLE IF NOT EXISTS opportunities (id INTEGER PRIMARY KEY, title TEXT, openings INTEGER, location TEXT, start_date TEXT, end_date TEXT, acc_provided TEXT, acc_covered TEXT);\n';
      data.forEach(opp => {
        let startDate = '';
        let endDate = '';
        if (opp.available_slots && opp.available_slots.length > 0) {
          startDate = opp.available_slots[0].start_date || '';
          endDate = opp.available_slots[0].end_date || '';
        }
        const safeTitle = (opp.title || '').replace(/'/g, "''");
        const safeLocation = (opp.location || '').replace(/'/g, "''");
        const id = opp.id || 0;
        const openings = opp.openings || 0;
        const accProv = (opp.logistics_info?.accommodation_provided || '').replace(/'/g, "''");
        const accCov = (opp.logistics_info?.accommodation_covered || '').replace(/'/g, "''");
        
        sql += `INSERT INTO opportunities (id, title, openings, location, start_date, end_date, acc_provided, acc_covered) VALUES (${id}, '${safeTitle}', ${openings}, '${safeLocation}', '${startDate}', '${endDate}', '${accProv}', '${accCov}');\n`;
      });
      fs.writeFileSync(path.join(dataDir, 'opps_data.sql'), sql);

      console.log('Successfully froze data into JSON, CSV, and SQL formats.');
    } catch (e) {
      console.error('Error parsing response: ', e, body);
    }
  });
});

req.on('error', e => {
  console.error('Request error: ', e);
});

req.write(JSON.stringify({ query }));
req.end();
