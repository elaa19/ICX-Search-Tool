const fs = require('fs');
const schema = JSON.parse(fs.readFileSync('opp_schema.json', 'utf8'));

const oppFields = schema.data.__type.fields;
const scalarFields = oppFields.filter(f => f.type.kind === 'SCALAR' || (f.type.kind === 'NON_NULL' && f.type.ofType.kind === 'SCALAR')).map(f => f.name);

// remove fields that take arguments or are known to error
const exclude = ['cover_photo'];
const queryFields = scalarFields.filter(f => !exclude.includes(f)).join('\n      ');

const query = `
query {
  allOpportunity(filters: { committee: 891, programmes: [7] }) {
    data {
      ${queryFields}
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
  fs.writeFileSync('opp_full_scalars.json', JSON.stringify(d.data.allOpportunity.data[0], null, 2));
  console.log("Done. Wrote opp_full_scalars.json");
}).catch(console.error);
