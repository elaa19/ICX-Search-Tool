const fs = require('fs');

async function checkOpp() {
  const query = `
    query {
      opportunities(filters: {
        committee: 891
      }, page: 1, per_page: 5) {
        data {
          id
          title
          programmes {
            id
            short_name
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://gis-api.aiesec.org/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "vlu-Ys3o-4AgydvVYPwvE_JmifEzTe0_CI710on9QjE" // new token
      },
      body: JSON.stringify({ query })
    });

    const result = await response.json();
    console.log(JSON.stringify(result.data.opportunities.data, null, 2));
    
  } catch (err) {
    console.error("Request failed:", err);
  }
}

checkOpp();
