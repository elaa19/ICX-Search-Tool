const query = `
{
  __type(name: "Opportunity") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
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
  fs.writeFileSync('c:/Users/ALA KAHRI/searchtool26/ICX-Search-Tool/opp_schema.json', JSON.stringify(d, null, 2));
  console.log("Done");
}).catch(console.error);
