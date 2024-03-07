"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var serve_static_1 = require("@hono/node-server/serve-static");
var hono_1 = require("hono");
var app = new hono_1.Hono();
app.use('/static/*', (0, serve_static_1.serveStatic)({ root: './' }));
app.get("/", function (c) {
    return c.json({
        owner: "danilppzz",
        license: {
            custom: "http://localhost:3000/static/LICENSE.txt"
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
    });
});
app.get("/presets", function (c) {
    return c.json({
        example: [
            {
                title: "default",
                url: "http://localhost:3000/badge/default",
                flags: { color: "dark", ct: "white", text: "EXAMPLE", rd: false }
            },
            {
                title: "support",
                url: "http://localhost:3000/badge/default?text=%F0%9F%A4%8D%20SUPPORT&rd=true",
                flags: { color: "dark", ct: "white", text: "%F0%9F%A4%8D%20SUPPORT", rd: true }
            },
            {
                title: "portfolio",
                url: "http://localhost:3000/badge/default?color=pink&ct=dark&text=PORTFOLIO&rd=false",
                flags: { color: "dark", ct: "dark", text: "PORTFOLIO", rd: false }
            },
            {
                title: "package",
                url: "http://localhost:3000/badge/default?text=%F0%9F%93%A6%20PACKAGE&rd=true",
                flags: { color: "dark", ct: "white", text: "%F0%9F%93%A6%20PACKAGE", rd: true }
            },
            {
                title: "resume",
                url: "http://localhost:3000/badge/default?text=%F0%9F%93%84%20RESUME&rd=false",
                flags: { color: "dark", ct: "white", text: "%F0%9F%93%84%20RESUME", rd: false }
            }
        ],
    });
});
app.get("/badge/default", function (c) {
    var color = c.req.query("color") || "dark";
    var ct = c.req.query("ct") || "white";
    var text = c.req.query("text") || "EXAMPLE";
    var rd = c.req.query("rd") || false;
    if (ct == "white" && color == "white")
        ct = 'dark';
    var rounded = "";
    if (rd == "true")
        rounded = 'rx="14" ry="14"';
    return new Response("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"120\" height=\"30\" role=\"img\" aria-label=\"".concat(text, "\"><title>Badge by danilppzz</title><g shape-rendering=\"crispEdges\"><rect width=\"100.25\" height=\"28\" fill=\"").concat(color, "\" ").concat(rounded, "/></g><g fill=\"").concat(ct, "\" text-anchor=\"middle\" font-family=\"Verdana,Geneva,DejaVu Sans,sans-serif\" text-rendering=\"geometricPrecision\" font-size=\"100\"><text transform=\"scale(.1)\" x=\"501.25\" y=\"175\" textLength=\"762.5\" fill=\"").concat(ct, "\" font-weight=\"bold\">").concat(text, "</text></g></svg>"), {
        status: 200,
        headers: {
            "Content-Type": "image/svg+xml",
        },
    });
});
var port = 3000;
console.log("http://localhost:".concat(port, "/"));
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: port,
});
