const express = require('express');
const serveStatic = require('serve-static');
const net = require('net');

const app = express();
const port = 3000;

// Función para encontrar un puerto disponible
function findAvailablePort(startingPort, maxAttempts) {
  return new Promise((resolve, reject) => {
    let currentPort = startingPort;
    let attempts = 0;

    function tryPort() {
      const server = net.createServer();

      server.once('error', (err) => {
        server.close();
        if (err.code === 'EADDRINUSE') {
          attempts++;
          if (attempts < maxAttempts) {
            currentPort++;
            tryPort();
          } else {
            reject(new Error(`No se pudo encontrar un puerto disponible después de ${maxAttempts} intentos.`));
          }
        } else {
          reject(err);
        }
      });

      server.once('listening', () => {
        server.close();
        resolve(currentPort);
      });

      server.listen(currentPort, '127.0.0.1');
    }

    tryPort();
  });
}

// Uso de la función para encontrar un puerto disponible
findAvailablePort(port, 10)
  .then((availablePort) => {
    app.listen(availablePort, () => {
      console.log(`Servidor iniciado en http://localhost:${availablePort}/`);
    });
  })
  .catch((error) => {
    console.error(`Error al encontrar puerto disponible: ${error.message}`);
  });

app.use('/static', serveStatic('./'));

app.get('/', (req, res) => {
  res.json({
    owner: 'danilppzz',
    license: {
      custom: `http://localhost:${port}/static/LICENSE.txt`,
    },
    versions: '1.0.0',
    api: [
      {
        default: `http://localhost:${port}/badge/default`,
      },
      {
        presets: `http://localhost:${port}/presets`,
      },
    ],
  });
});

app.get('/presets', (req, res) => {
    res.json({
      example: [
        {
          title: 'default',
          url: 'http://localhost:3000/badge/default',
          flags: { color: 'dark', ct: 'white', text: 'EXAMPLE', rd: false },
        },
        {
          title: 'support',
          url: 'http://localhost:3000/badge/default?text=%F0%9F%A4%8D%20SUPPORT&rd=true',
          flags: { color: 'dark', ct: 'white', text: '%F0%9F%A4%8D%20SUPPORT', rd: true },
        },
        {
          title: 'portfolio',
          url: 'http://localhost:3000/badge/default?color=pink&ct=dark&text=PORTFOLIO&rd=false',
          flags: { color: 'dark', ct: 'dark', text: 'PORTFOLIO', rd: false },
        },
        {
          title: 'package',
          url: 'http://localhost:3000/badge/default?text=%F0%9F%93%A6%20PACKAGE&rd=true',
          flags: { color: 'dark', ct: 'white', text: '%F0%9F%93%A6%20PACKAGE', rd: true },
        },
        {
          title: 'resume',
          url: 'http://localhost:3000/badge/default?text=%F0%9F%93%84%20RESUME&rd=false',
          flags: { color: 'dark', ct: 'white', text: '%F0%9F%93%84%20RESUME', rd: false },
        },
      ],
    });
  });

app.get('/badge/default', (req, res) => {
  var color = req.query.color || 'dark';
  var ct = req.query.ct || 'white';
  var text = req.query.text || 'EXAMPLE';
  var rd = req.query.rd || false;

  if (ct == 'white' && color == 'white') ct = 'dark';

  var rounded = '';
  if (rd == 'true') rounded = 'rx="14" ry="14"';

  res.status(200).set('Content-Type', 'image/svg+xml').send(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="30" role="img" aria-label="${text}"><title>Badge by danilppzz</title><g shape-rendering="crispEdges"><rect width="100.25" height="28" fill="${color}" ${rounded}/></g><g fill="${ct}" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100"><text transform="scale(.1)" x="501.25" y="175" textLength="762.5" fill="${ct}" font-weight="bold">${text}</text></g></svg>`
  );
});
