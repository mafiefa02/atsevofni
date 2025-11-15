import { type FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

interface UsePrefetchOnHoverProps<T> {
  queryOptions: FetchQueryOptions<T>;
  delayMs?: number;
  enabled?: boolean;
}

export const usePrefetchOnHover = <T>({
  queryOptions,
  delayMs = 200,
  enabled = true,
}: UsePrefetchOnHoverProps<T>) => {
  const queryClient = useQueryClient();

  const optionsRef = useRef(queryOptions);
  optionsRef.current = queryOptions; // update on every render

  const isHoveringRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerPrefetch = useCallback(() => {
    if (!enabled) return;
    queryClient.prefetchQuery(optionsRef.current);
  }, [queryClient, enabled]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    cancel();
    // only start if actually hovering
    if (isHoveringRef.current) {
      timeoutRef.current = setTimeout(triggerPrefetch, delayMs);
    }
  }, [cancel, triggerPrefetch, delayMs]);

  const onMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    startTimer();
  }, [startTimer]);

  const onMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    cancel();
  }, [cancel]);

  const restartPrefetchTimer = useCallback(() => {
    startTimer();
  }, [startTimer]);

  return {
    onMouseEnter,
    onMouseLeave,
    restartPrefetchTimer,
  };
};
