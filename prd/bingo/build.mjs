import * as esbuild from 'esbuild';
import http from 'http';

const [mode] = process.argv.slice(2);

const dirname = import.meta.dirname;

const result = await esbuild
  .context({
    entryPoints: [`${dirname}/src/index.tsx`],
    bundle: true,
    outdir: `${dirname}/public/js`,
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    },
  })
  .then((context) => {
    console.log('Build succeeded');

    return context;
  })
  .catch(() => process.exit(1));

switch (mode) {
  case 'build': {
    break;
  }
  case 'serve': {
    const { host, port } = await result.serve({
      servedir: `${dirname}/public`,
    });

    http
      .createServer((req, res) => {
        const options = {
          hostname: host,
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxyReq = http.request(options, (proxyRes) => {
          console.log(`${new Date().toISOString()} - ${req.method} to ${req.url}`);
          if (proxyRes.statusCode === 404) {
            const redirectReq = http.request(
              { ...options, path: `/?redirect=${encodeURIComponent(req.url)}` },
              (proxyRes) => {
                console.log(`  ↳ redirected to /`);

                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
              },
            );

            redirectReq.end();
          } else {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
          }
        });

        // Forward the body of the request to esbuild
        req.pipe(proxyReq, { end: true });
      })
      .listen(1274);

    await result.watch();
  }
}
