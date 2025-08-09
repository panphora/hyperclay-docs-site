Using https://saascustomdomains.com/

### local tunnel server for testing (webhooks)
## Delete the existing tunnel
```bash
# Delete the tunnel (this removes it from Cloudflare)
cloudflared tunnel delete localhyper

# Remove the credentials file
rm ~/.cloudflared/a1e67971-380c-4922-8011-efcd269d066e.json
```
## Authenticate with Cloudflare
```bash
cloudflared tunnel login
```
## Create a new tunnel from scratch
```bash
# Create new tunnel
cloudflared tunnel create malleabledocs

# This will output something like:
# Tunnel credentials written to /Users/davidmiranda/.cloudflared/[NEW-TUNNEL-ID].json
```

## Create the config file
```yaml
# ~/.cloudflared/config.yml
tunnel: malleabledocs
credentials-file: ~/.cloudflared/d2ecf37e-0b02-4efd-a6b0-ee732e35f167.json

ingress:
  # This catches root domain AND all subdomains
  - hostname: "*.malleabledocs.com"
    service: https://localhyperclay.com
    originRequest:
      noTLSVerify: true

  # Also include the root domain
  - hostname: malleabledocs.com
    service: https://localhyperclay.com
    originRequest:
      noTLSVerify: true

  - service: http_status:404
```

## Create DNS route
```bash
cloudflared tunnel route dns malleabledocs "*.malleabledocs.com"
cloudflared tunnel route dns malleabledocs malleabledocs.com
```

## Run the tunnel
```bash
cloudflared tunnel run malleabledocs
```


