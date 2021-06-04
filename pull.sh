#sync with Git origin master and refresh Glitch app
git remote add origin https://github.com/sunladen/sunladen.github.io.git
git fetch origin master
git reset --hard origin/master
git pull origin master --force
refresh
