import fs from 'fs';
import path from 'path';
import { PluginAssembly, deploy } from './models/pluginAssembly';
import { DeployCredentials } from './dataverse.service';
import { WebApiConfig } from 'dataverse-webapi/lib/node';
import { logger } from 'just-scripts-utils';

export async function deployAssembly(creds: DeployCredentials, apiConfig: WebApiConfig): Promise<void> {
  const currentPath = '.';
  const configFile = fs.readFileSync(path.resolve(currentPath, 'dataverse.config.json'), 'utf8');

  if (configFile == null) {
    logger.warn('unable to find dataverse.config.json file');
    return;
  }

  const config: PluginAssembly = JSON.parse(configFile).connection;

  logger.info('deploy assembly');

  try {
    await deploy(config, apiConfig, creds.solution);
  } catch (error) {
    logger.error(error.message);
    return;
  }

  logger.info(`deployed assembly ${config.name}\r\n`)
}