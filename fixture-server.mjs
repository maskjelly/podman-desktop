import http from 'node:http';

const base = 'http://127.0.0.1:17490';
const catalog = {
  extensions: [{
    publisher: { publisherName: 'local-test', displayName: 'Local test' },
    extensionName: 'preview-check',
    displayName: 'Catalog Preview Check',
    shortDescription: 'Local fixture for a stable catalog version with no preview flag.',
    license: 'Apache-2.0',
    categories: ['Other'],
    keywords: [],
    versions: [{
      version: '1.0.0',
      lastUpdated: '2026-10-24T00:00:00.000Z',
      ociUri: 'quay.io/local-test/preview-check:1.0.0',
      files: [
        { assetType: 'README', data: `${base}/README.md` },
        { assetType: 'icon', data: `${base}/icon.svg` },
      ],
    }],
  }],
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/catalog.json') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(catalog));
  } else if (req.url === '/README.md') {
    res.setHeader('Content-Type', 'text/markdown');
    res.end('# Stable catalog version\n\nVersion **1.0.0** omits the optional preview flag. Its version, install action and README should be available together.\n\nThis is a local regression fixture. No extension is installed.\n');
  } else if (req.url === '/icon.svg') {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.end('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="16" fill="#3d235f"/><text x="48" y="61" fill="white" text-anchor="middle" font-family="sans-serif" font-size="38">C</text></svg>');
  } else {
    res.writeHead(404).end();
  }
}).listen(17490, '127.0.0.1', () => process.stdout.write('Fixture ready on 127.0.0.1:17490\n'));
