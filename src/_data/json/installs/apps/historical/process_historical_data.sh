#!/bin/bash

# Directory where the daily JSON files are stored
INPUT_DIR="."
OUTPUT_DIR="apps"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through each daily JSON file (YYYY-MM-DD.json)
for daily_file in "$INPUT_DIR"/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].json; do
    if [ ! -f "$daily_file" ]; then
        continue  # Skip if no files match
    fi

    date=$(basename "$daily_file" .json)
    echo "Processing $date..."

    # Process each app entry in the daily file
    jq -r 'to_entries[] | "\(.key) \(.value)"' "$daily_file" | while read appId count; do
        output_file="$OUTPUT_DIR/${appId}.json"

        if [ -f "$output_file" ]; then
            # Update existing file (append new entry)
            jq \
                --arg date "$date" \
                --arg count "$count" \
                '.history += [{"date": $date, "count": $count}]' \
                "$output_file" > tmp.json && mv tmp.json "$output_file"
        else
            # Create new file
            jq -n \
                --arg appId "$appId" \
                --arg date "$date" \
                --arg count "$count" \
                '{
                    appId: $appId,
                    history: [{
                        date: $date,
                        count: $count
                    }]
                }' > "$output_file"
        fi
    done
done

echo "Processing complete. Files saved in $OUTPUT_DIR/"