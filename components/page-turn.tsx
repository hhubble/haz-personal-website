"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ComponentProps,
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type PageTurnContextValue = {
  turnTo: (href: string) => void;
};

const PageTurnContext = createContext<PageTurnContextValue | null>(null);

export function PageTurnProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTurning, setIsTurning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const turnTo = useCallback(
    (href: string) => {
      if (isTurning) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      clearTimers();
      setIsTurning(true);
      timers.current.push(
        setTimeout(() => router.push(href), 320),
        setTimeout(() => setIsTurning(false), 680),
      );
    },
    [clearTimers, isTurning, router],
  );

  return (
    <PageTurnContext.Provider value={{ turnTo }}>
      {children}
      {isTurning ? (
        <div className="page-turn-overlay" aria-hidden="true">
          <div className="page-turn-sheet" />
        </div>
      ) : null}
    </PageTurnContext.Provider>
  );
}

type TurnLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function TurnLink({ href, onClick, ...props }: TurnLinkProps) {
  const context = useContext(PageTurnContext);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank"
    ) {
      return;
    }

    event.preventDefault();

    if (context) {
      context.turnTo(href);
      return;
    }

    window.location.assign(href);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
