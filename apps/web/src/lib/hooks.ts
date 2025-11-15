import { type FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useEffect, useLayoutEffect, useState } from "react";

import { IS_SERVER } from "./constants";

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

export const useIsomorphicLayoutEffect = !IS_SERVER
  ? useLayoutEffect
  : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
}
