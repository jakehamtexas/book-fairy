import * as esbuild from 'esbuild';

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
    void result.serve({
      servedir: `${dirname}/public`,
    });
    void result.watch();
  }
}
