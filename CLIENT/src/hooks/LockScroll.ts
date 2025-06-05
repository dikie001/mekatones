import { useLayoutEffect } from "react";

export const LockBodyScroll = (active: boolean) => {
  useLayoutEffect(() => {
    if (active) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [active]);
};
