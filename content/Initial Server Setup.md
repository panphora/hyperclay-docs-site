A good guide I didn't use: https://becomesovran.com/blog/server-setup-basics.html

`server-setup.sh`: https://gist.github.com/panphora/c0ba8bf893835df84e7a7f1fd97a4893
write me a well documented bash script for ubuntu that's meant to be run on the server and performs the following tasks
* sets server time to always use utc
* updates all packages
* install nginx
* install node.js
* install pm2
* add pm2 to system startup using a service
* allow ssh through firewall (before enabling firewall)
* enables firewall

`app-setup.sh`: https://gist.github.com/panphora/db671e0990a6fa9607603c66c2bac7b0
write me a well documented bash script for ubunutu that's meant to be run on the server and performs the following tasks
* asks for domain name
* asks if domain name is pointed at server
* asks for project name and creates /var/www/{project_name}
* asks for localhost port
* creates example "hello, world!" express js server in project directory with given port and starts it with pm2
* restarts nginx

SSL for wildcards is handled manually, see: https://gist.github.com/panphora/4e72cdcb743b0d2ada24ee1dd580cfba

`deploy.sh`: https://gist.github.com/panphora/56a98ddbc5265af59797cca6acbc6c1e
write me a well documented bash script for mac that's meant to be run on my local machine and performs the following tasks
* allows me to specify a server and a directory to deploy to in two variables at the top of the script
* uploads all files in my current git repo to the server and directory specified, only overwriting matching files, but leaving other files untouched


