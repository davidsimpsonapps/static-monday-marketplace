#!/bin/bash

# Process historical app category data with robust error handling

# Configuration
HIST_DIR="./historical"
OUTPUT_DIR="./categories"
#START_DATE="2024-12-28"
START_DATE="2025-06-22"
CURRENT_DATE=$(date -u +"%Y-%m-%d")
LOG_FILE="./process_categories.log"

# Initialize
mkdir -p "$OUTPUT_DIR"
echo "Starting processing at $(date)" > "$LOG_FILE"

# Date conversion for MacOS
start_sec=$(date -j -f "%Y-%m-%d" "$START_DATE" +"%s")
current_sec=$(date -j -f "%Y-%m-%d" "$CURRENT_DATE" +"%s")

# Function to sanitize JSON
sanitize_json() {
    local input_file="$1"
    
    # First pass: remove control characters and invalid Unicode
    tr -cd '\11\12\15\40-\176' < "$input_file" | \
    
    # Second pass: clean up JSON structure and remove unwanted keys
    jq -c '
        del(.description, .short_description, .compliance_answers, .plans) |
        walk(
            if type == "object" then 
                with_entries(
                    select(.key | 
                        . != "description" and 
                        . != "short_description" and 
                        . != "compliance_answers" and 
                        . != "plans"
                    )
                )
            elif type == "string" then 
                gsub("[^[:print:]]"; "") | 
                if . == "" then empty else . end
            else . end
        )
    ' 2>/dev/null || echo '{}'
}

# Process files
while [ "$start_sec" -le "$current_sec" ]; do
    date_str=$(date -j -f "%s" "$start_sec" +"%Y-%m-%d")
    input_file="$HIST_DIR/$date_str.json"
    
    if [ -f "$input_file" ]; then
        echo "Processing $date_str..."
        echo "Processing $date_str..." >> "$LOG_FILE"
        
        # Create sanitized temp file
        sanitized_file="${input_file}.sanitized"
        sanitize_json "$input_file" > "$sanitized_file"
        
        # Validate JSON
        if ! jq empty "$sanitized_file" 2>> "$LOG_FILE"; then
            echo "Invalid JSON in $input_file after sanitization, skipping..." | tee -a "$LOG_FILE"
            # rm -f "$sanitized_file"
            start_sec=$((start_sec + 86400))
            continue
        fi
        
        # Process apps with error handling
        jq -c '.marketplace_apps[]?' "$sanitized_file" 2>> "$LOG_FILE" | while read -r app_data; do
            if [ -z "$app_data" ]; then
                continue
            fi
            
            # Extract data with error checking
            app_id=$(echo "$app_data" | jq -r '.app_id? // empty' 2>> "$LOG_FILE")
            categories=$(echo "$app_data" | jq '.marketplace_category_ids? // []' 2>> "$LOG_FILE")
            
            if [ -z "$app_id" ] || [ "$categories" = "null" ]; then
                echo "Invalid app data in $input_file: $app_data" >> "$LOG_FILE"
                continue
            fi
            
            output_file="$OUTPUT_DIR/$app_id.json"
            
            # Create sanitized entry
            daily_entry=$(jq -n \
                --arg date "$date_str" \
                --argjson categories "$categories" \
                '{date: $date, marketplace_category_ids: $categories}' 2>> "$LOG_FILE")
            
            if [ $? -ne 0 ]; then
                echo "Failed to create entry for app $app_id on $date_str" >> "$LOG_FILE"
                continue
            fi
            
            # Update or create file
            if [ -f "$output_file" ]; then
                jq --argjson entry "$daily_entry" \
                    '.history += [$entry]' "$output_file" > "${output_file}.tmp" 2>> "$LOG_FILE" && \
                    mv "${output_file}.tmp" "$output_file"
            else
                jq -n \
                    --arg app_id "$app_id" \
                    --argjson entry "$daily_entry" \
                    '{
                      description: "Category history for app \($app_id)",
                      history: [$entry]
                    }' > "$output_file" 2>> "$LOG_FILE"
            fi
            
            if [ $? -ne 0 ]; then
                echo "Failed to write $output_file" >> "$LOG_FILE"
                rm -f "${output_file}.tmp" 2>/dev/null
            fi
        done
        
        # Clean up temp file
        # rm -f "$sanitized_file"
    else
        echo "No data file for $date_str" >> "$LOG_FILE"
    fi
    
    start_sec=$((start_sec + 86400))
done

# Clean up any empty/invalid files
rm -f ./categories/-1.json ./categories/.json ./categories/.json.tmp 2>/dev/null

echo "Processing complete. Check $LOG_FILE for details."
echo "App category histories saved to $OUTPUT_DIR/"