const query = `
query {
  allOpportunity(filters: { committee: 891, programmes: [7] }) {
    data {
      id
      title
      earliest_start_date
      latest_end_date
      duration
      openings
      location
      profile_photo
      cover_photo
      role_info {
        city
      }
      project_info {
        name
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
  fs.writeFileSync('c:/Users/ALA KAHRI/searchtool26/ICX-Search-Tool/opp_dump.json', JSON.stringify(d, null, 2));
  console.log("Done");
}).catch(console.error);
