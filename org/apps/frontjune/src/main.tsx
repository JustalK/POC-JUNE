import { StrictMode } from 'react';
import { AnalyticsBrowser } from '@june-so/analytics-next';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const analytics = AnalyticsBrowser.load({
  writeKey: 'wpdpi6qyHu0VDkr7',
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
