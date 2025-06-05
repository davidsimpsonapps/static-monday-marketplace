#!/bin/bash

# Create the project directory structure
mkdir -p eleventy-tailwind-starter/src/{_includes/{layouts,partials},css,js,images}

# Change to the project directory
cd eleventy-tailwind-starter || exit

# Initialize package.json
cat > package.json << 'EOF'
{
  "name": "eleventy-tailwind-starter",
  "version": "1.0.0",
  "description": "A starter project for Eleventy with Tailwind CSS",
  "scripts": {
    "start": "eleventy --serve",
    "build": "NODE_ENV=production eleventy",
    "watch": "eleventy --watch",
    "dev": "tailwindcss -i ./src/css/styles.css -o ./src/css/tailwind.css --watch & eleventy --serve",
    "build:css": "tailwindcss -i ./src/css/styles.css -o ./src/css/tailwind.css --minify",
    "build:all": "npm run build:css && npm run build"
  },
  "devDependencies": {
    "@11ty/eleventy": "^2.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.0.0"
  }
}
EOF

# Create Eleventy config file
cat > .eleventy.js << 'EOF'
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Watch for changes in these folders
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/js");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
EOF

# Create Tailwind config
cat > tailwind.config.js << 'EOF'
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_includes/**/*.{html,js,njk,md}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Create PostCSS config
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
EOF

# Create base layout template
cat > src/_includes/layouts/base.njk << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  {% include "partials/head.njk" %}
</head>
<body class="min-h-screen bg-gray-50">
  <main class="container mx-auto px-4 py-8">
    {% block content %}{% endblock %}
  </main>
</body>
</html>
EOF

# Create head partial
cat > src/_includes/partials/head.njk << 'EOF'
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ title }}</title>
<link rel="stylesheet" href="/css/styles.css">
EOF

# Create main CSS file
cat > src/css/styles.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Create home page
cat > src/index.njk << 'EOF'
---
layout: layouts/base.njk
title: Home
---

{% block content %}
<h1 class="text-4xl  text-blue-600 mb-6">Welcome to 11ty + Tailwind!</h1>
<p class="text-lg text-gray-700">This is a starter template with Eleventy and Tailwind CSS.</p>
{% endblock %}
EOF

# Create empty JS directory placeholder
touch src/js/.gitkeep
touch src/images/.gitkeep

# Install dependencies
npm install

echo "Eleventy + Tailwind starter project created successfully!"
echo "Run 'npm run dev' to start the development server."
