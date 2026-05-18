export type BootstrapStatus =
  | 'ready'
  | 'pulling'
  | 'error-no-ollama'
  | 'error-pull-failed';

export interface IElectronAPI {
  pingServer: () => Promise<boolean>;
  ingestFile: (path: string) => Promise<number | { error: string }>;
  queryLocalBrain: (query: string) => Promise<string>;
  openFileDialog: () => Promise<{ path: string; name: string } | null>;
  onBootstrapStatus: (callback: (status: BootstrapStatus) => void) => void;
  onBootstrapProgress: (callback: (progress: number) => void) => void;
  onAuthToken: (callback: (token: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI | undefined;
  }
}
