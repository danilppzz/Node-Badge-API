import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    owner: "danilppzz",
    versions: "1.0",
    example: [
      {
        url: "http://localhost:3000/badge?color=dark&text=version%201.0&rd=true",
        flags: {color: "dark", text: "version 1.0", rd: true}
      }
    ],
  });
});

// request: http://localhost:3000/badge?color=dark&text=version%202.0&rd=true
app.get("/badge", (c) => {
  const color = c.req.query("color");
  const text = c.req.query("text");
  const rd = c.req.query("rd");

  var rounded = "";
  if (rd) rounded = 'rx="14" ry="14"';
  
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="30" role="img" aria-label="${text}"><title>Badge by danilppzz</title><g shape-rendering="crispEdges"><rect width="100.25" height="28" fill="${color}" ${rounded}/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><text transform="scale(.1)" x="501.25" y="175" textLength="762.5" fill="#fff" font-weight="bold">${text}</text></g></svg>`,
    {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    }
  );
});

const port = 3000;
console.log(`http://localhost:${port}/`);

serve({
  fetch: app.fetch,
  port,
});
