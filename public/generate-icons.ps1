# PWA Icons Generation Script
# Run this to generate all required PWA icons from the base favicon-96x96.png

# For now, we'll copy the existing favicon to create different sizes
# In production, you should generate proper sized icons

# Create web-app-manifest icons for PWA
Copy-Item "favicon-96x96.png" "web-app-manifest-192x192.png"
Copy-Item "favicon-96x96.png" "web-app-manifest-512x512.png"
