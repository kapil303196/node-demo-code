#!/bin/bash

# Install Nginx
sudo apt update
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install Certbot and the Nginx plugin for Certbot using snap
sudo snap install --classic certbot

# Install the Nginx plugin for Certbot
sudo snap set certbot trust-plugin-with-root=ok
sudo snap install certbot-dns-nginx

# Link Certbot to your PATH (if necessary)
if ! command -v certbot &> /dev/null; then
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
fi

# Create an Nginx configuration for your domain in sites-available
cat <<EOL | sudo tee /etc/nginx/sites-available/devapi.yourdomain.com
server {
    listen 80;
    server_name devapi.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOL

# Link the configuration to sites-enabled to activate it
sudo ln -s /etc/nginx/sites-available/devapi.yourdomain.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx to apply the new configuration
sudo systemctl reload nginx

# Keep trying to obtain the SSL certificate until successful
until sudo certbot --nginx -d devapi.yourdomain.com; do
    echo "Failed to obtain certificate. Retrying in 60 seconds..."
    sleep 60
done

# Setting up automatic renewal
# Append to root's crontab without opening an editor
echo "30 3 * * * /usr/bin/certbot renew --quiet" | sudo crontab -u root -

# All done!
echo "Setup completed. Your API should now be accessible over HTTPS at https://devapi.yourdomain.com"
