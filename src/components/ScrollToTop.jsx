import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (hash) return;                      // #anchor links are handled by the Navbar
    if (navigationType === "POP") return;  // Back/Forward: let the browser restore position

    // "instant" overrides the html { scroll-behavior: smooth } rule
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, navigationType]);

  return null;
}