# Node-Badge-API

To copy this project you have to paste this command in your terminal.
```cmd
git clone https://github.com/danilppzz/Hono-Badge-API.git
```
Next thing you should do is look if you have nodejs v20 or higher.

In this porject I use .tsx files by HonoJS, because is better to return code as html.


### This is the default root response ```http://localhost:3000/```
```json
{
  "owner": "danilppzz",
  "license": {
    "custom": "http://localhost:3000/license"
  },
  "versions": "1.0.0",
  "api": [
    {
      "default": "http://localhost:3000/badge/default"
    },
    {
      "presets": "http://localhost:3000/presets"
    }
  ]
}
```


> [!NOTE]
> This api also has a presets endpoint with information and copy links to the presets at ```http://localhost:3000/presets```
> Here your can find 5 presets made by me (danilppzz).

```js
  var color = req.query.color || 'dark';
  var ct = req.query.ct || 'white';
  var text = req.query.text || 'EXAMPLE';
  var rd = req.query.rd || false;
```
