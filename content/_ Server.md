
```bash
# IP: 5.161.65.13
ssh hyperspace

# nginx config
/etc/nginx/nginx.conf

# sites
/etc/nginx/sites-enabled/
```


## Check app health
```bash
tail -n 500 -f $HOME/.pm2/logs/hyperclay-error.log

tail -n 500 -f $HOME/.pm2/logs/hyperclay-out.log
```

```
pm2 logs hyperclay --lines 100
```

```
/var/log/nginx/error.log
```

https://serverbuddy.io (down atm 😔)