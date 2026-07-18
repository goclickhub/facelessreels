"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Icon } from "@iconify/react";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-50 w-75 sm:w-85
          bg-[rgb(var(--card))] border border-[rgb(var(--border))]
          rounded-md shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3
            bg-[rgb(var(--primary))]"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                {/* <MessageCircle size={13} className="text-white" /> */}
                <Icon
                  icon="flowbite:message-caption-solid"
                  width="16"
                  height="16"
                  className="text-white"
                />
              </div>
              <div>
                <p className="text-[12px] font-bold text-white">
                  FacelessReels Support
                </p>
                <p className="text-[10px] text-white/70">Coming soon</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white cursor-pointer transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 px-4 py-4 min-h-45 space-y-3
            bg-[rgb(var(--muted))]"
          >
            {/* Bot message */}
            <div className="flex gap-2 items-start">
              <div
                className="w-6 h-6 rounded-full bg-[rgb(var(--primary))]
                flex items-center justify-center shrink-0 mt-0.5"
              >
                {/* <MessageCircle size={11} className="text-white" /> */}
                <Icon
                  icon="flowbite:message-caption-solid"
                  width="12"
                  height="12"
                  className="text-white"
                />
              </div>
              <div
                className="bg-[rgb(var(--card))] rounded-md px-3 py-2 max-w-55
                border border-[rgb(var(--border))]"
              >
                <p className="text-[11px] text-[rgb(var(--foreground))] leading-relaxed">
                  Live chat support isn&apos;t available yet — check back soon! 👋
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-2.5
            border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Coming soon..."
              disabled
              className="flex-1 h-8 px-3 text-[11px] rounded-md
                bg-[rgb(var(--muted))] border border-[rgb(var(--border))]
                text-[rgb(var(--foreground))]
                placeholder:text-[rgb(var(--muted-foreground))]
                cursor-not-allowed opacity-70
                focus:outline-none focus:ring-1 focus:ring-[rgb(var(--ring))]/40"
            />
            <button
              disabled
              className="w-8 h-8 rounded-md bg-[rgb(var(--primary))]
                flex items-center justify-center text-white
                opacity-60 cursor-not-allowed transition-opacity shrink-0"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger bubble */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full
          bg-[rgb(var(--primary))] text-white shadow-lg
          flex items-center justify-center
          hover:opacity-90 transition-all duration-200 cursor-pointer
          hover:scale-105 active:scale-95"
        aria-label="Open chat"
      >
        {open ? (
          <X size={18} />
        ) : (
          <Icon icon="flowbite:message-caption-solid" width="24" height="24" />
        )}
      </button>
    </>
  );
}
