#!/bin/sh
echo -e "\033[1;36m-----------------------------------"
echo -e "| Deploying the latest release... |"
echo -e "-----------------------------------\033[0m\n"

set -e

echo -e "=== Start backup existing files... ===\n"
DIR_PATH_BASE=" /var/www/goudster.be/"
BACKUP_FOLDER="$DIR_PATH_BASE/backup/backup_$(date +%Y-%m-%d_%H-%M)"
mkdir -p "$BACKUP_FOLDER"
if cp -r "$DIR_PATH_BASE/webapp/" "$BACKUP_FOLDER"; then
    echo -e "\033[32m✓ Backup completed\033[0m\n"
else
    echo -e "\033[1;31m✗ Error: backup failed.\033[0m\n"
fi

echo -e "=== Start cloning github repo... ===\n"
GITHUB_REPO_URL="https://github.com/jorishr/goudster.git"
NEW_RELEASE_FOLDER="$DIR_PATH_BASE/new_release"

git clone "$GITHUB_REPO_URL" "$NEW_RELEASE_FOLDER"

echo -e "=== Starting npm install... ===\n"
cd "$NEW_RELEASE_FOLDER"

RECOMMENDED_NODE_VERSION=$(jq -r '.engines.node' package.json)

[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"

nvm use "$RECOMMENDED_NODE_VERSION" || nvm use 20

npm install --production
npm run build

echo -e "=== Stop process of existing application... ===\n"
pm2 stop goudster
wait $!
echo -e "=== \033[32m✓ Process halted gracefully. ===\033[0m\n"

echo -e "=== Start removing existing webapp files... ===\n"
if rm -rf "$DIR_PATH_BASE/webapp"/*; then
    echo -e "\033[32m✓ Existing files deleted\033[0m\n"
else
    echo -e "\033[1;31m✗ Error: Error while deleting existing files.\033[0m\n"
fi

echo -e "=== Start copying build files to final destination... ===\n"
if  cp -r $NEW_RELEASE_FOLDER/dist/* "$DIR_PATH_BASE/webapp" &&
    cp -r $NEW_RELEASE_FOLDER/node_modules/* "$DIR_PATH_BASE"; then
    echo -e "\033[32m✓ Files copied to final destination folder\033[0m\n"
else
    echo -e "\033[1;31m✗ Error: Error while copying files to final destination folder.\033[0m\n"
fi

echo -e "=== Starting the app... ===\n"
pm2 restart goudster
wait $!
echo -e "=== \033[32m✓ App process started by PM2. ===\033[0m\n"

echo -e "=== Starting clean up... ===\n"
if rm -rf $NEW_RELEASE_FOLDER; then
    echo -e "\033[32m✓ Temporary folder cleaned up.\033[0m\n"
else
    echo -e "\033[1;31m✗ Error: Error while cleaning up temporary folder.\033[0m\n"
fi

nvm use default

echo -e "\033[1;32m---------------------------------------"
echo -e "| ✓ New release deployed succesfully! |"
echo -e "---------------------------------------\033[0m\n"
