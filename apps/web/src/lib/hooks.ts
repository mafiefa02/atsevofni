import { type FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useEffect, useLayoutEffect, useState } from "react";

import { IS_SERVER } from "./constants";

interface UseHoverDelayedTriggerProps<T> {
  onTrigger: (data: T) => void;
  options?: {
    delayMs?: number;
  };
}

export const useHoverDelayedTrigger = <T = void>({
  onTrigger,
  options,
}: UseHoverDelayedTriggerProps<T>) => {
  const isHoveringRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // avoid resetting the timer if the parent component re-renders
  // such as when the filter changes
  const onTriggerRef = useRef(onTrigger);
  onTriggerRef.current = onTrigger;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (data: T) => {
      cancel();
      if (isHoveringRef.current) {
        timeoutRef.current = setTimeout(() => {
          onTriggerRef.current(data);
        }, options?.delayMs);
      }
    },
    [cancel, options],
  );

  const onMouseEnter = useCallback(
    (data: T) => {
      isHoveringRef.current = true;
      startTimer(data);
    },
    [startTimer],
  );

  const onMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    cancel();
  }, [cancel]);

  return {
    onMouseEnter,
    onMouseLeave,
    restartTimer: startTimer,
  };
};

interface UsePrefetchOnHoverProps<T> {
  queryOptions: FetchQueryOptions<T>;
  options?: {
    delayMs?: number;
  };
}

export const usePrefetchOnHover = <T>({
  queryOptions,
  options,
}: UsePrefetchOnHoverProps<T>) => {
  const queryClient = useQueryClient();

  const prefetchAction = useCallback(() => {
    queryClient.prefetchQuery(queryOptions);
  }, [queryClient, queryOptions]);

  const { onMouseEnter, onMouseLeave, restartTimer } =
    useHoverDelayedTrigger<void>({ onTrigger: prefetchAction, options });

  return {
    onMouseEnter,
    onMouseLeave,
    restartTimer,
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
