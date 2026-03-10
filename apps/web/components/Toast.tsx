"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onCloseAction: () => void;
  duration?: number;
};

export default function Toast({ message, type = "success", onCloseAction, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseAction();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onCloseAction]);

  const bgColor = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
  };

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${bgColor[type]}`}>
        <span className="text-lg">{icon[type]}</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onCloseAction}
          className="ml-2 text-sm opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
