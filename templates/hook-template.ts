// Template pour nouveaux hooks Flow Up
import { useState, useEffect, useCallback } from 'react';

interface UseFeatureOptions {
  // Options avec defaults
  autoStart?: boolean;
}

interface UseFeatureReturn {
  // Interface de retour explicite
  data: any;
  loading: boolean;
  error: string | null;
  actions: {
    start: () => void;
    stop: () => void;
  };
}

export const useFeature = (
  options: UseFeatureOptions = {},
): UseFeatureReturn => {
  const { autoStart = false } = options;

  // 1. State
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Effects
  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart]);

  // 3. Actions
  const start = useCallback(() => {
    setLoading(true);
    setError(null);
    // Logic here
  }, []);

  const stop = useCallback(() => {
    setLoading(false);
    // Cleanup here
  }, []);

  // 4. Return interface
  return {
    data,
    loading,
    error,
    actions: {
      start,
      stop,
    },
  };
};
