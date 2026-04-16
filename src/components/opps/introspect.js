const fs = require('fs');

async function introspect() {
  const query = `
    query {
      __type(name: "Query") {
        fields {
          name
          args {
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
    }
  `;

  try {
    const response = await fetch("https://gis-api.aiesec.org/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "6_Ru7Qy9UcbMqy0sIu9II98KEhtvDfO7aNMnSMihgtA"
      },
      body: JSON.stringify({ query })
    });

    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err);
  }
}

introspect();
