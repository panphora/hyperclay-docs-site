edit local nginx config:
```bash
subl /opt/homebrew/etc/nginx/nginx.conf
```


```
    server {
        listen 80;
        server_name *.localhyperclay.com localhyperclay.com;

        location / {
            proxy_pass http://localhost:9999;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```


dnsmasq config for subdomains:
https://claude.ai/chat/d6b7dc3c-c609-437d-ae99-a25d7660a4f1


setup mkcert for local https (for cross domain cookies, subdomain to apex)
https://claude.ai/chat/fe16aae0-3df9-4902-ae79-9ebe01ca03e4