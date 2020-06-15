/* eslint-disable @typescript-eslint/no-explicit-any */
import envinfo from 'envinfo';
import os from 'os';
import path from 'path';

let envInfoCache: { Binaries: { Yarn: any; npm: any } };

export const getEnvInfo = (): any => {
  return envInfoCache;
};

export const initialize = async (): Promise<any> => {
  envInfoCache = JSON.parse(
    await envinfo.run(
      {
        Binaries: ['Yarn', 'npm']
      },
      { json: true, showNotFound: false }
    )
  );

  if (envInfoCache.Binaries.Yarn) {
    envInfoCache.Binaries.Yarn.path = expandHome(envInfoCache.Binaries.Yarn.path);
  }

  if (envInfoCache.Binaries.npm) {
    envInfoCache.Binaries.npm.path = expandHome(envInfoCache.Binaries.npm.path);
  }

  return envInfoCache;
};

const expandHome = (pathString: string) => {
  if (pathString.startsWith('~' + path.sep)) {
    return pathString.replace('~', os.homedir());
  }

  return pathString;
}
