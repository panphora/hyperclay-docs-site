get real-time syncing working
  1. file changes
  2. file is saved to server, after setting `isAdmin = false` in a virtual document and running onRender
  3. server tells other clients file changed
  4. other clients grab updated "public" document
  5. they also create a virtual document copy of their current document, they run onRender attributes on their current document, passing in `isAdmin = false`, to create "public" version
  7. they compare the two documents, applying the diff to the source document
  8. as long as elements are only removed when inside a `remove-contents` element, then this should work

```
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store clients
let clients = [];

// SSE Setup
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add client to the list
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);

  // When client closes connection, remove it
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

// Endpoint to receive page updates and notify other clients
app.post('/save', (req, res) => {
  const { pageRoute, clientId } = req.body;
  sendEvent(pageRoute, { pageUpdated: true }, clientId);
  res.status(200).send({message: 'Page saved and event sent.'});
});

// Function to send event to all clients except the sender
function sendEvent(route, data, senderId) {
  clients.forEach(client => {
    if(client.id !== senderId) {
      client.res.write(`event: ${route}\ndata: ${JSON.stringify(data)}\n\n`);
    }
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```



```
function listenEvent(route, callback) {
  const eventSource = new EventSource('/events');

  eventSource.addEventListener(route, event => {
    const data = JSON.parse(event.data);
    callback(data);
  });

  eventSource.onopen = event => {
    console.log('Connection to server opened.');
  };

  eventSource.onerror = event => {
    console.log('Error:', event);
  };
}

function savePage() {
  // Assuming `pageRoute` is available globally or passed to this function
  // `clientId` should be a unique identifier for this client, could be a session token or similar
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pageRoute: "/pageRoute", clientId: clientId }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Example usage
listenEvent("/pageRoute", event => {
  if (event.pageUpdated) {
    console.log("Page updated!");
  }
});
```