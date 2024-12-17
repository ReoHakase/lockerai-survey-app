import type { ReactNode } from 'react';
import { JotaiProvider } from './JotaiProvider';
import { ThemeProvider } from './ThemeProvider';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): ReactNode => (
  <ThemeProvider>
    <JotaiProvider>{children}</JotaiProvider>
  </ThemeProvider>
);
