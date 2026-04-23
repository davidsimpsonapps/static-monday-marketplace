#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Fetching vendor install data..."
curl -s 'https://marketplace-ms.monday.com/marketplace_ms/public/marketplace-developers?includeEnrichment=true' > vendors.json

mkdir -p src/_data/json/installs/vendors/historical
current_date=$(date +'%Y-%m-%d')

cp vendors.json "src/_data/json/installs/vendors/historical/${current_date}.json"
cp vendors.json "src/_data/json/installs/vendors/vendors.json"

echo "Processing vendor entries for ${current_date}..."

jq -c '.marketplace_developers[] | {id: .id, installs: .installs}' vendors.json | while read -r entry; do
  vendorId=$(echo "$entry" | jq -r '.id')
  count=$(echo "$entry" | jq -r '.installs')
  output_file="src/_data/json/installs/vendors/${vendorId}.json"

  if [ -f "$output_file" ]; then
    jq \
      --arg date "$current_date" \
      --arg count "$count" \
      '.history += [{"date": $date, "count": $count}]' \
      "$output_file" > tmp.json && mv tmp.json "$output_file"
  else
    jq -n \
      --arg vendorId "$vendorId" \
      --arg date "$current_date" \
      --arg count "$count" \
      '{
        vendorId: $vendorId,
        history: [{
          date: $date,
          count: $count
        }]
      }' > "$output_file"
  fi
done

echo "Done. Processed $(jq '.marketplace_developers | length' vendors.json) vendors."
