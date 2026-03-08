"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { API } from "@/api/api";
import { Spinner } from "@/components/ui/spinner";

const loadingTasks = new Set<string>();
const listeners = new Set<() => void>();

export const fullscreenLoader = {
  push: (id: string) => {
    loadingTasks.add(id);
    for (const listener of listeners) listener();
  },
  remove: (id: string) => {
    loadingTasks.delete(id);
    for (const listener of listeners) listener();
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => loadingTasks.size > 0,
};

export function FullscreenLoader() {
  const [isReady, setIsReady] = useState(false);
  const isLoadingTasks = useSyncExternalStore(
    fullscreenLoader.subscribe,
    fullscreenLoader.getSnapshot,
    fullscreenLoader.getSnapshot,
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkHealth = async () => {
      const res = await API.getHealth();

      if (res.isOk) {
        setIsReady(true);
        clearInterval(interval);
      }
    };

    checkHealth();
    interval = setInterval(checkHealth, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isReady && !isLoadingTasks) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isReady ? "bg-background/80 backdrop-blur-sm" : "bg-background"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10 text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {!isReady ? "Waiting for app to start..." : "Loading..."}
        </p>
      </div>
    </div>
  );
}
