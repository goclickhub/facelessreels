"use client";
import { useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    }

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
