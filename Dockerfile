# MODZ Kiosk - Static Web App
# Simple nginx container serving the kiosk app

FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the app files
COPY src/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

