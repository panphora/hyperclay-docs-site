
🚨 IMPORTANT 🚨 
1. Make sure database was backed up recently
2. Record the latest commit on remote, just in case we need to roll back

```bash
./deploy.sh
ssh hyperclay
cd /var/www/hyperclay
npm run migrate # may need to run more than once to get to latest
```