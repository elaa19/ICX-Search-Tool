const fs = require('fs');

async function introspect() {
  const query = `
    query {
      __type(name: "Opportunity") {
        name
        fields {
          name
          type {
            name
            kind
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
    fs.writeFileSync('introspect.json', JSON.stringify(result.data.__type.fields, null, 2));
    
  } catch (err) {
    console.error("Request failed:", err);
  }
}

introspect();
