#!/bin/sh
mkdir /var/www/goudster.be/update && cd /var/www/goudster.be/update
pwd
git clone https://github.com/jorishr/goudster.git
echo "Repo cloned"
echo "Starting NPM install and build tasks..."
cd goudster
pwd
npm install --omit=dev
npm run build
echo "NPM install and build completed"
echo "Copying new files..."
pwd
ls -al
cp -r node_modules /var/www/goudster.be/
cp -r dist /var/www/goudster.be/
echo "Files copied"
pm2 restart goudster
echo "Cleaning up..."
rm -rf /var/www/goudster.be/update
echo "Done"