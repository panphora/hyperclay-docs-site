approach that should work:
- page 1 updated, notifies server
- server pings page 2
- page 2 gets updated html
- page 2 makes a copy of its viewer (non admin) html (using `DOMParser()`)
- page 2 diffs updated html to its copy
- page 2 applies diff

this approach should solve issues with elements being out of order because scripts dynamically inserted them

all it requires is that dynamically added elements are placed inside of a div whose contents are removed before the diff takes place (e.g. `<div diff-ignore-contents>`)

these `diff-ignore-contents` elements might proliferate, but they won't cause any issues, just empty divs that are never diffed. and they shouldn't proliferate really because they should mostly maintain their order.


```
app.get('/hyhMcgLVm0oLvBctPeCAzpMrZV7qUfo8GwjmmaMVlCgVGgmY2Y8MO0X65Wfsdlyu8KQMaZzTG5rghRnsnSXDbH4uM8ZWOY5vYsy1AlAwUVlJvZHnAWzwSIo0iE1raOtWumdf2zrVJgPOGNf8m3B3qsxig3NL8ApjGzlDQGikzBxcGRN8gMKlg2YizrIznPVBkhKMbxPGpCc76wwRtnCz4KiwAHevKyrYpUi3y7LHwWUBdQIP', (req, res) => {
  res.send(page("clients", "left", `<div style="display: flex; justify-content: space-between; padding-top: 3rem;">
  <h2 style="margin-top: 0;">Clients</h2>
</div>
${clients.map(client => `<div style="margin-bottom: 2rem;">
  <div>confirmed: ${client.confirmedCookie}</div>
  <div>in memory: ${client.inMemoryId}</div>
</div>`).join("")}`));
});
```


```
app.get("/events/:inMemoryId", (req, res, next) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
    "Expires": "-1",
    "Pragma": "no-cache",
    "X-Accel-Buffering": "no"
  };
  res.writeHead(200, headers);

  let confirmedCookie = req.cookies.confirmed;
  let inMemoryId = req.params.inMemoryId;

  let isAdminAlreadyConnected = _.find(clients, {confirmedCookie});
  if (isAdminAlreadyConnected) {
    res.write(`event: already-here\n`);
    res.write(`data: already-here\n\n`);
  }

  clients.push({
    res,
    confirmedCookie,
    inMemoryId
  });

  req.on("close", () => {
    _.remove(clients, client => {
      return client.confirmedCookie === confirmedCookie && client.inMemoryId === inMemoryId;
    });
  });
});
```

```
// get diff between old version and this newly saved version
let oldAdminHtml = await fs.readFile(path.join(PATH_ADMIN_SITE_DIR, siteName + ".html"), "utf8");
let domDiff = dd.diff(oldAdminHtml.replace(doctypeRegex, ""), adminHtml.replace(doctypeRegex, ""));
let data = {
  domDiff: domDiff,
  inMemoryId: inMemoryId
};

// send diff to clients who are owners of the page
clients.forEach(client => {
  let isAdminOfCurrentPage = req.cookies.confirmed === client.confirmedCookie;
  if (isAdminOfCurrentPage) {
    client.res.write(`event: diff\n`);
    client.res.write(`data: ${JSON.stringify(data)}\n`);
    client.res.write(`id: ${Date.now()}\n\n`);
  }
});
```

