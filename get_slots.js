const query = `
query {
  allOpportunity(filters: { committee: 891, programmes: [7] }) {
    data {
      title
      available_slots {
        id
        title
        start_date
        end_date
      }
    }
  }
}
`;
fetch('https://gis-api.aiesec.org/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'IaVsbi8-DqvZ8AVJbEs5yQGgS83BoRLcv4ORmxvZTLo'
  },
  body: JSON.stringify({ query })
}).then(r => r.json()).then(d => {
  const fs = require('fs');
  fs.writeFileSync('c:/Users/ALA KAHRI/searchtool26/ICX-Search-Tool/slots_dump.json', JSON.stringify(d, null, 2));
  console.log("Done");
}).catch(console.error);
