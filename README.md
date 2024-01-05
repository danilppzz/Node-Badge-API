# Badge-API made with HonoJS 

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
> This api also has a presets root with information and copy links to the presets at ```http://localhost:3000/presets```
<<<<<<< HEAD
> Here your can find 5 presets made by me (danilppzz).
=======
> Here your can find 5 presets made by me (danilppzz).
>>>>>>> 66647c40f2fb2d61f68cab9fadf3090d91289e24
