#!/bin/bash

# Read the marketplace.json file and extract the marketplace_apps array
MARKETPLACE_FILE="../../marketplace/marketplace.json"
if [ ! -f "$MARKETPLACE_FILE" ]; then
    echo "Error: marketplace.json file not found at $MARKETPLACE_FILE"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install it with 'brew install jq'"
    exit 1
fi

# Temporary files for storing app data
APP_IDS_FILE=$(mktemp)
APP_DATA_FILE=$(mktemp)

# Extract app data from marketplace.json
jq -c '.marketplace_apps[] | {id: .id, app_id: .app_id}' "$MARKETPLACE_FILE" > "$APP_DATA_FILE"

# Process each historical file
HISTORICAL_DIR="./historical/"
if [ ! -d "$HISTORICAL_DIR" ]; then
    echo "Error: historical directory not found at $HISTORICAL_DIR"
    exit 1
fi


# Process each app
while read -r app_data; do
    id=$(echo "$app_data" | jq -r '.id')
    app_id=$(echo "$app_data" | jq -r '.app_id')
    
    echo "Processing app $app_id (id: $id)"
    
    # Initialize history array
    history="[]"
    
    # Process each historical file
    for historical_file in "$HISTORICAL_DIR"*.json; do
        if [ ! -f "$historical_file" ]; then
            continue
        fi
        
        # Extract date from filename (assuming format YYYY-MM-DD.json)
        filename=$(basename "$historical_file")
        date="${filename%.json}"
        
        # Check if the ID is in the historical file
        if jq -e --arg id "$id" 'map(tostring) | index($id)' "$historical_file" > /dev/null; then
            count=1
        else
            count=0
        fi
        
        # Create the new history entry
        new_entry=$(jq -n \
            --arg date "$date" \
            --argjson count "$count" \
            '{date: $date, count: $count}')
        
        # Append to the history
        history=$(echo "$history" | jq --argjson entry "$new_entry" '. + [$entry]')
    done
    
    # Write output file
    output_file="./${app_id}.json"
    jq -n \
        --arg id "$id" \
        --arg appId "$app_id" \
        --argjson history "$history" \
        '{id: $id, appId: $appId, history: $history}' > "$output_file"
    
    echo "  Created history file: $output_file"
done < "$APP_DATA_FILE"

# Clean up temporary files
rm "$APP_IDS_FILE" "$APP_DATA_FILE"

echo "Processing complete. All files saved to ./"