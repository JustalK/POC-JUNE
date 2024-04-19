import { useEffect, useState } from 'react';
import { AnalyticsBrowser } from '@june-so/analytics-next';

export function useJune() {
  const [analytics, setAnalytics] = useState<AnalyticsBrowser | undefined>(
    undefined
  );

  useEffect(() => {
    const loadAnalytics = async () => {
      const response = AnalyticsBrowser.load({
        writeKey: 'wpdpi6qyHu0VDkr7',
      });
      setAnalytics(response);
    };
    loadAnalytics();
  }, []);

  return analytics;
}
