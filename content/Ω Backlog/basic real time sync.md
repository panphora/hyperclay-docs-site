backed up code
```js
/*


  REAL-TIME SYNC


*/

const clients = new Map();
const clientsLock = new Map();

app.get("/sync/:siteName", checkExistingCustomer, checkIsSiteOwner, (req, res) => {
  const siteName = req.params.siteName;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
  const clientId = idPublic();
  clientsLock.set(clientId, true);
  clients.set(clientId, { siteName, res });
  res.write(`data: {"msg": "all ok"}\n\n`);
  req.on("close", () => {
    clientsLock.delete(clientId);
    clients.delete(clientId);
  });
});

app.post("/broadcast/:siteName", checkExistingCustomer, checkIsSiteOwner, (req, res) => {
  const siteName = req.params.siteName;
  const data = req.body;
  clients.forEach((client, clientId) => {
    if (client.siteName === siteName) {
      if (clientsLock.has(clientId)) {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
      }
    }
  });
  res.sendStatus(200);
});
```

GOALS
- syncs html across all EDITABLE versions of a page
- doesn't update non-admin pages
- https://github.com/patrick-steele-idem/morphdom

```js
import {sendSync, receiveSync} from "/js/ajax/syncDOM.js";

receiveSync(cookie.get("currentSite"), res => {
  if (res.msg === "html") {
    console.log("HTML RECEIVED", res.html);
  }
});

sendSync(cookie.get("currentSite"), {
  html: "<!DOCTYPE html>" + document.documentElement.outerHTML,
  msg: "html"
});
```


current: `realTimeCollaboration.js`

```js
// server side
const clients = new Map();

app.get('/sync/:id', (req, res) => {
  const id = req.params.id;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  const clientId = Date.now();
  clients.set(clientId, { id, res });
  req.on('close', () => {
    clients.delete(clientId);
  });
});

app.post('/broadcast/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  clients.forEach((client, clientId) => {
    if (client.id === id) {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  });
  res.sendStatus(200);
});

// client side
let senderId = Date.now();

const syncState = (id, data) => {
  fetch(`/broadcast/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data, sender: senderId })
  });
};

const receiveState = (id, callback) => {
  const eventSource = new EventSource(`/sync/${id}`);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.sender !== senderId) {
      callback(data);
    }
  };
};

// usage
const pageId = 'unique-id';

// Receive data from other clients
receiveState(pageId, ({ html }) => {
  console.log(html);
});

// Broadcast data to other clients
syncState(pageId, { html: '<div>Hello, world!</div>' });
```

to do
1. wait for document load before enabling
2. sync everything
3. watch for more changes to page and debounce save when they happen

pages
- normal site
- /edit/ code editor page

features
- callback for editing DOM before saving
- ability to pass in HTML you want saved
	- pass in editor contents on edit code page
	- pass in full DOM on other pages
- always filter out DOCTYPE before diffing

how it works
1. when a page changes, ping server (send a date.getTime() id)
2. all matching pages get the updated HTML
3. all matching pages sync updated HTML into themselves
	1. if date.getTime() id matches the one this page sent, don't sync it