const fs = require('fs');
async function test() {
  const query = `
    query {
      opportunities(filters: { committee: 891 }, page: 1, per_page: 1) {
        data {
          id title status earliest_start_date latest_end_date project_fee openings
          location
          branch { name }
          duration
          specifics_info { salary }
        }
      }
    }
  `;
  try {
    const response = await fetch("https://gis-api.aiesec.org/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "vlu-Ys3o-4AgydvVYPwvE_JmifEzTe0_CI710on9QjE" },
      body: JSON.stringify({ query })
    });
    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch(e) { console.error(e); }
}
test();
