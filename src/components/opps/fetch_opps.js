const fs = require('fs');

async function fetchOpps() {
  const COMMITTEE_ID = "891";
  let allData = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const query = `
      query {
        opportunities(filters: {
          programmes: [7], 
          committee: ${COMMITTEE_ID},
          statuses: ["open"]
        }, page: ${page}, per_page: 100) {
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
            slots {
              start_date
              end_date
            }
          }
          paging {
            total_pages
            current_page
          }
        }
      }
    `;

    try {
      const response = await fetch("https://gis-api.aiesec.org/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "H6kj5er0SCob26L9L7CSyeYpbUUEohahqZyign1rqOI"
        },
        body: JSON.stringify({ query })
      });

      const result = await response.json();
      
      if (result.errors) {
        fs.writeFileSync('error.json', JSON.stringify(result.errors, null, 2));
        console.error("GraphQL errors written to error.json");
        break;
      }
      
      const opps = result.data.opportunities.data;
      if (opps && opps.length > 0) {
        allData = allData.concat(opps);
      }
      
      const paging = result.data.opportunities.paging;
      console.log(`Fetched page ${page} of ${paging ? paging.total_pages : 'unknown'}`);
      if (!paging || page >= paging.total_pages) {
        hasMore = false;
      } else {
        page++;
      }
    } catch (err) {
      console.error("Request failed:", err);
      break;
    }
  }

  // Define drive arrays
  const driveFolderIds = {
    "Hearltbeat": "1d8CaX5AquzX32gV2SZsX88aw_iuNBPp6",
    "Fingerprint": "11OWnuuw5mnwsyyru-BmiPreYkHEc_7go",
    "Global Classroom": "1Zw4aAqMqU3uIFwPd4GsV2q63w1Kzg3G6",
    "Skill Up!": "1Uv-oVlphxa5rFZxX-ODrwwL4py9key1Q",
    "On the Map": "1l_co24o4f7pK3qqoq6sGsNcG0IobVWRC",
    "Green Leader": "15D5AcrM53Ua0wT-0EhCtp9qVjrH1rGyv",
    "Raise your voice": "1s5ql3MgeB5SyMNQlwvMi4zp-IaH4eG5K",
    "Scale-up": "1SYGsBb_YPInpmDXorNYdKFUYdTd-S-I4",
    "Youth for impact": "1RYl1zLp4ZlCEEmM15sL2WezBZzDEA-WQ"
  };

  // Manually filter to ensure we strictly get open ones
  const openData = allData.filter(opp => opp.status === "open");
  console.log(`Filtered down to ${openData.length} officially OPEN opportunities out of ${allData.length}`);

  // Map the data
  const mappedData = openData.map(opp => {
    let accProvided = opp.logistics_info?.accommodation_provided || opp.specifics_info?.accommodation_provided || "Not specified";
    let accCovered = opp.logistics_info?.accommodation_covered || opp.specifics_info?.accommodation_covered || "Not specified";
    let city = opp.role_info?.city || opp.location || "Tunisia";
    
    let startDate = "TBD";
    let endDate = "TBD";
    if (opp.earliest_start_date) {
        startDate = new Date(opp.earliest_start_date).toISOString().split('T')[0];
    } else if (opp.slots && opp.slots.length > 0) {
        const validStartDates = opp.slots.map(s => new Date(s.start_date)).filter(d => !isNaN(d));
        if (validStartDates.length > 0) {
            startDate = new Date(Math.min(...validStartDates)).toISOString().split('T')[0];
        }
    }
    if (opp.latest_end_date) {
        endDate = new Date(opp.latest_end_date).toISOString().split('T')[0];
    } else if (opp.slots && opp.slots.length > 0) {
        const validEndDates = opp.slots.map(s => new Date(s.end_date)).filter(d => !isNaN(d));
        if (validEndDates.length > 0) {
            endDate = new Date(Math.max(...validEndDates)).toISOString().split('T')[0];
        }
    }

    return {
      "ID": opp.id,
      "PROJECT": opp.title,
      "Start date": startDate,
      "End date": endDate,
      "Accomodation Provided": accProvided,
      "Accomodation Covered": accCovered,
      "Fee (€)": opp.project_fee || 0,
      "#SLOTS": opp.openings || 0,
      "Location": city,
      "Duration": opp.duration || "N/A",
      "DriveId": driveFolderIds[opp.title] || null // additional useful detail
    };
  });

  const path = require('path');
  fs.writeFileSync(path.join(__dirname, 'frozen_opportunities.json'), JSON.stringify(mappedData, null, 2));
  console.log(`Success! Fetched and froze ${mappedData.length} opportunities.`);
}

fetchOpps();
