const fs = require('fs');
const path = require('path');

const TOKEN = "EJ24kzs7Xy-3vvzy62OaEvrcclew4wkA70yh_6xX_RM";
const COMMITTEE_ID = "891";
const TODAY = new Date().toISOString().split('T')[0];

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

async function fetchProgramme(programmeId, programmeName) {
  let allData = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const query = `
      query {
        opportunities(filters: {
          programmes: [${programmeId}], 
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
            specifics_info {
              salary
              salary_periodicity
              salary_currency {
                alphabetic_code
              }
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
          "Authorization": TOKEN
        },
        body: JSON.stringify({ query })
      });

      const result = await response.json();
      
      if (result.errors) {
        console.error(`[${programmeName}] GraphQL errors:`, JSON.stringify(result.errors));
        break;
      }
      
      const opps = result.data.opportunities.data;
      if (opps && opps.length > 0) {
        allData = allData.concat(opps);
      }
      
      const paging = result.data.opportunities.paging;
      console.log(`[${programmeName}] Page ${page}/${paging ? paging.total_pages : '?'} — ${opps ? opps.length : 0} items`);
      if (!paging || page >= paging.total_pages) {
        hasMore = false;
      } else {
        page++;
      }
    } catch (err) {
      console.error(`[${programmeName}] Request failed:`, err.message);
      break;
    }
  }

  // Filter: open AND not expired (end date in the future)
  const liveData = allData.filter(opp => {
    if (opp.status !== "open") return false;
    if (opp.latest_end_date) {
      const endDate = new Date(opp.latest_end_date).toISOString().split('T')[0];
      if (endDate < TODAY) {
        console.log(`  [${programmeName}] Skipping expired: "${opp.title}" (ended ${endDate})`);
        return false;
      }
    }
    return true;
  });

  console.log(`[${programmeName}] ${liveData.length} live out of ${allData.length} total`);

  // Map data
  const mapped = liveData.map(opp => {
    let accProvided = opp.logistics_info?.accommodation_provided || "Not specified";
    let accCovered = opp.logistics_info?.accommodation_covered || "Not specified";
    let city = opp.role_info?.city || opp.location || "Tunisia";
    
    let startDate = "TBD", endDate = "TBD";
    if (opp.earliest_start_date) {
      startDate = new Date(opp.earliest_start_date).toISOString().split('T')[0];
    } else if (opp.slots?.length > 0) {
      const valid = opp.slots.map(s => new Date(s.start_date)).filter(d => !isNaN(d));
      if (valid.length) startDate = new Date(Math.min(...valid)).toISOString().split('T')[0];
    }
    if (opp.latest_end_date) {
      endDate = new Date(opp.latest_end_date).toISOString().split('T')[0];
    } else if (opp.slots?.length > 0) {
      const valid = opp.slots.map(s => new Date(s.end_date)).filter(d => !isNaN(d));
      if (valid.length) endDate = new Date(Math.max(...valid)).toISOString().split('T')[0];
    }

    // Salary info (GT & GTe)
    let salary = null;
    if (opp.specifics_info?.salary) {
      salary = {
        amount: opp.specifics_info.salary,
        periodicity: opp.specifics_info.salary_periodicity || null,
        currency: opp.specifics_info.salary_currency?.alphabetic_code || "TND"
      };
    }

    const entry = {
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
      "Programme": programmeName
    };

    if (programmeId === 7) {
      entry["DriveId"] = driveFolderIds[opp.title] || null;
    }
    if (salary) {
      entry["Salary"] = salary;
    }

    console.log(`  ✓ "${opp.title}" | slots: ${opp.openings} | salary: ${salary ? `${salary.amount} ${salary.currency}` : 'N/A'} | ends: ${endDate}`);
    return entry;
  });

  return mapped;
}

async function main() {
  console.log("=== Fetching ALL programmes for Medina (committee 891) ===");
  console.log(`Date: ${TODAY}\n`);

  const gv = await fetchProgramme(7, "Global Volunteer");
  const gt = await fetchProgramme(8, "Global Talent");
  const gte = await fetchProgramme(9, "Global Teacher");

  fs.writeFileSync(path.join(__dirname, 'frozen_opportunities.json'), JSON.stringify(gv, null, 2));
  fs.writeFileSync(path.join(__dirname, 'frozen_gt_opportunities.json'), JSON.stringify(gt, null, 2));
  fs.writeFileSync(path.join(__dirname, 'frozen_gte_opportunities.json'), JSON.stringify(gte, null, 2));

  console.log(`\n=== SUMMARY ===`);
  console.log(`Global Volunteer: ${gv.length} live opportunities`);
  console.log(`Global Talent:    ${gt.length} live opportunities`);
  console.log(`Global Teacher:   ${gte.length} live opportunities`);
  console.log(`Total:            ${gv.length + gt.length + gte.length} opportunities frozen`);
}

main();
