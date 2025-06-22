#!/bin/bash

# Download daily JSON files from R2 storage

# Set the start date
start_date="2024-12-28"
current_date=$(date -u +"%Y-%m-%d")  # Get current date in UTC

# Base URL for the files
base_url="https://pub-cc788774cef14c4282f29525ba5fa95f.r2.dev/xxxx"

# Convert dates to seconds since epoch for comparison
start_sec=$(date -j -f "%Y-%m-%d" "$start_date" +"%s")
current_sec=$(date -j -f "%Y-%m-%d" "$current_date" +"%s")

# Loop through each day
while [ "$start_sec" -le "$current_sec" ]; do
    # Format the date
    date_str=$(date -j -f "%s" "$start_sec" +"%Y-%m-%d")
    file_url="$base_url/$date_str.json"
    output_file="$date_str.json"
    
    echo "Downloading $file_url..."
    
    # Download the file with curl
    curl -s -f -o "$output_file" "$file_url"
    
    # Check if download was successful
    if [ $? -eq 0 ]; then
        echo "Successfully downloaded $output_file"
    else
        echo "File not found for $date_str"
        rm -f "$output_file"  # Remove empty file if download failed
    fi
    
    # Move to next day
    start_sec=$((start_sec + 86400))  # Add one day in seconds
done

echo "Download complete for available files."