#!/bin/bash

# Process historical app install counts and create summary file

# Configuration
HIST_DIR="./apps/historical"
OUTPUT_FILE="./all-app-installs.json"
START_DATE="2024-12-28"
CURRENT_DATE=$(date -u +"%Y-%m-%d")  # Get current date in UTC

# Initialize the output JSON structure
echo '{
  "description": "All apps in the marketplace",
  "history": []
}' > "$OUTPUT_FILE"

# Convert dates to seconds since epoch for comparison
start_sec=$(date -j -f "%Y-%m-%d" "$START_DATE" +"%s")
current_sec=$(date -j -f "%Y-%m-%d" "$CURRENT_DATE" +"%s")

# Process each day's file
while [ "$start_sec" -le "$current_sec" ]; do
    # Format the date
    date_str=$(date -j -f "%s" "$start_sec" +"%Y-%m-%d")
    input_file="$HIST_DIR/$date_str.json"
    
    if [ -f "$input_file" ]; then
        echo "Processing $date_str..."
        
        # Calculate total count using jq
        total_count=$(jq '[.[] | tonumber] | add' "$input_file")
        
        # Create the daily entry
        daily_entry=$(jq -n \
            --arg date "$date_str" \
            --argjson count "$total_count" \
            '{date: $date, count: $count|tostring}')
        
        # Update the output file
        jq --argjson entry "$daily_entry" \
            '.history += [$entry]' "$OUTPUT_FILE" > "${OUTPUT_FILE}.tmp" && \
            mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"
    else
        echo "No data file for $date_str"
    fi
    
    # Move to next day
    start_sec=$((start_sec + 86400))  # Add one day in seconds
done

echo "Processing complete. Results saved to $OUTPUT_FILE"