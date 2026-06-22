import { RequestType0 } from 'vscode-languageclient/node';

export interface RuntimeVersionDetails {
  puppetVersion: string;
  facterVersion: string;
  languageServerVersion: string;
  runtimeName: string;
  runtimeGemVersion: string;
  factRuntimeName: string;
  factRuntimeGemVersion: string;
  factsLoaded: boolean;
  functionsLoaded: boolean;
  typesLoaded: boolean;
  classesLoaded: boolean;
}

export const runtimeVersionRequest = new RequestType0<RuntimeVersionDetails, void>('puppet/getVersion');
