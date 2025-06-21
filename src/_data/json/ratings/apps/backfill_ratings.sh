#!/bin/bash

# Process historical rating data and build per-app history files

# Set the start date
start_date="2025-06-21"
current_date=$(date -u +"%Y-%m-%d")  # Get current date in UTC

# Historical data directory
hist_dir="./historical"

# Convert dates to seconds since epoch for comparison
start_sec=$(date -j -f "%Y-%m-%d" "$start_date" +"%s")
current_sec=$(date -j -f "%Y-%m-%d" "$current_date" +"%s")

# Initialize an associative array to track which apps we've processed
declare -A processed_apps

# Loop through each day
while [ "$start_sec" -le "$current_sec" ]; do
    # Format the date
    date_str=$(date -j -f "%s" "$start_sec" +"%Y-%m-%d")
    input_file="$hist_dir/$date_str.json"
    
    # Check if file exists
    if [ -f "$input_file" ]; then
        echo "Processing $input_file..."
        
        # Use jq to process the JSON file
        apps=$(jq -r 'keys[]' "$input_file")
        
        for appId in $apps; do
            # Get the rating data for this app on this date
            rating_data=$(jq -r --arg appId "$appId" --arg date "$date_str" \
                '.[$appId] | {date: $date, rating: .rating, count: .count}' "$input_file")
            
            # Check if we already have a file for this app
            output_file="$appId.json"
            
            if [ -f "$output_file" ]; then
                # Update existing file
                jq --argjson new "$rating_data" \
                    '.history += [$new]' "$output_file" > "${output_file}.tmp" && \
                    mv "${output_file}.tmp" "$output_file"
            else
                # Create new file
                echo "Creating new history file for app $appId"
                jq -n --arg appId "$appId" --argjson new "$rating_data" \
                    '{appId: $appId, history: [$new]}' > "$output_file"
            fi
            
            # Mark this app as processed
            processed_apps["$appId"]=1
        done
    else
        echo "No data file for $date_str"
    fi
    
    # Move to next day
    start_sec=$((start_sec + 86400))  # Add one day in seconds
done

# Report summary
echo "Processing complete. Created/updated ${#processed_apps[@]} app history files."