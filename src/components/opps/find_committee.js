const fs = require('fs');

async function findCommittee() {
  const query = `
    query {
      committees(q: "Tunisia") {
        data {
          id
          name
          tag
          country
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
    console.log(JSON.stringify(result, null, 2));
    
  } catch (err) {
    console.error("Request failed:", err);
  }
}

findCommittee();
