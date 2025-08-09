Better: https://chatgpt.com/c/677aad38-a2bc-8001-bffe-452a1a8ba267





--- 
https://chatgpt.com/share/4f6b5f0c-c444-4541-b0cb-97f3ea3a5e94

I personally REALLY want this, but I don't want to implement it.

USER FLOW
1. Site dropdown: custom domain
2. Submit custom domain
3. Instructions for validating ownership AND forwarding domain
4. Click DONE
5. Domain in light blue, small font below site name with spinning loading indicator
6. When ownership and DNS confirmed, light blue checkmark appears next to domain
7. Clicking on site name takes you to hyperspace URL
8. Clicking on custom domain takes you to custom domain

BACKEND
1. Store custom domain in sites meta
2. If custom domain is unconfirmed, poll for an update every 15s
3. When custom domain is confirmed
	1. Create a file named after the custom domain in sites and symlink it to the original site
	2. Create NGINX config

SAVING
1. Allow saving to customsite.com/save

LOGIN
1. Allow logging in at customsite.com/login


```js
app.post('/add-domain', async (req, res) => {
  const { domain, verificationToken, email } = req.body;

  try {
    await validateDomainOwnership(domain, verificationToken);
    await validateDns(domain);
    await createNginxConfig(domain);
    await setupHttps(domain, email);
    await sendEmail(email, domain);

    res.send('Domain added and configured successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function validateDomainOwnership(domain, token) {
  return new Promise((resolve, reject) => {
    dns.resolveTxt(domain, (err, records) => {
      if (err) return reject(new Error('DNS lookup failed'));
      const valid = records.some(record => record.includes(token));
      if (!valid) return reject(new Error('Invalid verification token'));
      resolve();
    });
  });
}

function validateDns(domain) {
  return new Promise((resolve, reject) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err) return reject(new Error('DNS lookup failed'));
      const valid = addresses.includes(serverIp);
      if (!valid) return reject(new Error('DNS not pointing to server'));
      resolve();
    });
  });
}

function createNginxConfig(domain) {
  return new Promise((resolve, reject) => {
    const config = `
server {
  listen 80;
  server_name ${domain};
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
    `;
    fs.writeFile(`/etc/nginx/sites-available/${domain}`, config, (err) => {
      if (err) return reject(new Error('Failed to write Nginx config'));
      fs.symlink(`/etc/nginx/sites-available/${domain}`, `/etc/nginx/sites-enabled/${domain}`, (err) => {
        if (err) return reject(new Error('Failed to enable Nginx config'));
        exec('nginx -s reload', (err) => {
          if (err) return reject(new Error('Failed to reload Nginx'));
          resolve();
        });
      });
    });
  });
}

function setupHttps(domain, email) {
  return new Promise((resolve, reject) => {
    exec(`certbot --nginx -d ${domain} --non-interactive --agree-tos --email ${email}`, (err, stdout, stderr) => {
      if (err) return reject(new Error(`Failed to obtain SSL certificate: ${stderr}`));
      resolve();
    });
  });
}

function sendEmail(email, domain) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'YOUR_EMAIL@gmail.com',
        pass: 'YOUR_EMAIL_PASSWORD'
      }
    });

    const mailOptions = {
      from: 'YOUR_EMAIL@gmail.com',
      to: email,
      subject: 'Domain Setup Complete',
      text: `Your domain ${domain} has been successfully set up and configured with HTTPS.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(new Error('Failed to send email'));
      resolve();
    });
  });
}

app.listen(3000, () => console.log('Server running on port 3000'));
```


middleware:
```js
const isAuthenticatedAndDomainVerified = (req, res, next) => {
  const origin = req.headers.origin;
  if (req.session.user && req.session.verifiedDomains && req.session.verifiedDomains.includes(origin)) {
    next();
  } else {
    res.status(401).send('Unauthorized or unverified domain');
  }
};
```