async function test() {
  const query = `{
    opportunities(filters: {
      programmes: [8],
      committee: 891,
      statuses: ["open"]
    }, page: 1, per_page: 100) {
      data {
        id
        title
        status
        earliest_start_date
        latest_end_date
        project_fee
        openings
        location
        duration
        logistics_info {
          accommodation_provided
          accommodation_covered
        }
        role_info {
          city
        }
      }
      paging {
        total_pages
        current_page
      }
    }
  }`;

  const r = await fetch("https://gis-api.aiesec.org/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "3Rxvkng0szDb9kC4RdnBkksNvaInWCnDkVgvR5Q-oiI"
    },
    body: JSON.stringify({ query })
  });
  const j = await r.json();
  console.log(JSON.stringify(j, null, 2));
}
test();
