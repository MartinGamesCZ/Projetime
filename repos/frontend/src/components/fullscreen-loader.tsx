"use client";

import { useEffect, useState } from "react";
import { API } from "@/api/api";
import { Spinner } from "@/components/ui/spinner";

export function FullscreenLoader() {
  const [isReady, setIsReady] = useState(false);

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

  if (isReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10 text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Waiting for app to start...
        </p>
      </div>
    </div>
  );
}
