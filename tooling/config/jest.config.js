/** @typedef {import('jest').Config} Config */

export default async () => {
  /** @type {Config} */
  const config = {
    rootDir: process.cwd(),
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    projects: [
      {
        displayName: 'prd-auth',
        id: 'prd-auth',
      },
    ],
  };

  return Promise.resolve(config);
};
