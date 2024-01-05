import { serve } from "@hono/node-server";
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from "hono";

const app = new Hono();

app.use('/public/*', serveStatic({ root: './' }))

app.get("/", (c) => {
  return c.json({
    owner: "danilppzz",
    license: {
      custom: "http://localhost:3000/license"
    },
    versions: "1.0.0",
    api: [
      {
        default: "http://localhost:3000/badge/default"
      },
      {
        presets: "http://localhost:3000/presets"
      }
    ]
    
  })
})

app.get("/license", (c) => {
  return c.html('<iframe style="width: 100%; height: 100%;" src="http://localhost:3000/public/LICENSE.txt" frameBorder={0}></iframe>');
})

app.get("/presets", (c) => {
  return c.json({
    example: [
      {
        title: "default",
        url: "http://localhost:3000/badge/default",
        flags: {color: "dark", ct: "white", text: "EXAMPLE", rd: false}
      },
      {
        title: "support",
        url: "http://localhost:3000/badge/default?text=%F0%9F%A4%8D%20SUPPORT&rd=true",
        flags: {color: "dark", ct: "white", text: "%F0%9F%A4%8D%20SUPPORT", rd: true}
      },
      {
        title: "portfolio",
        url: "http://localhost:3000/badge/default?color=pink&ct=dark&text=PORTFOLIO&rd=false",
        flags: {color: "dark", ct: "dark", text: "PORTFOLIO", rd: false}
      },
      {
        title: "package",
        url: "http://localhost:3000/badge/default?text=%F0%9F%93%A6%20PACKAGE&rd=true",
        flags: {color: "dark", ct: "white", text: "%F0%9F%93%A6%20PACKAGE", rd: true}
      },
      {
        title: "resume",
        url: "http://localhost:3000/badge/default?text=%F0%9F%93%84%20RESUME&rd=false",
        flags: {color: "dark", ct: "white", text: "%F0%9F%93%84%20RESUME", rd: false}
      }
    ],
  });
});

app.get("/badge/default", (c) => {
  var color = c.req.query("color") || "dark";
  var ct = c.req.query("ct") || "white";
  var text = c.req.query("text") || "EXAMPLE";
  var rd = c.req.query("rd") || false;

  if (ct == "white" && color == "white") ct = 'dark';

  var rounded = "";
  if (rd == "true") rounded = 'rx="14" ry="14"';
  
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="30" role="img" aria-label="${text}"><title>Badge by danilppzz</title><g shape-rendering="crispEdges"><rect width="100.25" height="28" fill="${color}" ${rounded}/></g><g fill="${ct}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><text transform="scale(.1)" x="501.25" y="175" textLength="762.5" fill="${ct}" font-weight="bold">${text}</text></g></svg>`,
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
