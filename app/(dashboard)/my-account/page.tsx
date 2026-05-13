"use client";

import { useRef, useState } from "react";
import {
  User,
  Camera,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MyAccountPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("Administrator Hello");
  const [email, setEmail] = useState("info@videocafe.com");
  const [currentPw, setCurrentPw] = useState("•••••••");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="px-4 md:px-6 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <User size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">
          Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* ── Left: form card ── */}
        <div
          className="bg-[rgb(var(--card))] border border-[rgb(var(--border))]
          rounded-md p-5 space-y-4"
        >
          {/* Profile image row */}
          <div className="flex items-center gap-4 pb-4 border-b border-[rgb(var(--border))]">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-full bg-[rgb(var(--muted))]
                border-2 border-[rgb(var(--primary))]/40
                flex items-center justify-center overflow-hidden"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={28}
                    className="text-[rgb(var(--muted-foreground))]"
                  />
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full
                  bg-[rgb(var(--primary))] text-white flex items-center justify-center
                  cursor-pointer hover:opacity-90 transition-opacity shadow"
              >
                <Camera size={11} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setAvatar(URL.createObjectURL(f));
                }}
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
                {name}
              </p>
              <p className="text-[11px] text-[rgb(var(--muted-foreground))]">
                {email}
              </p>
              <button
                onClick={() => fileRef.current?.click()}
                className="mt-1.5 flex items-center gap-1.5 h-7 px-3 rounded-md
                  bg-[rgb(var(--primary))] text-white text-[10px] font-semibold
                  cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Camera size={11} /> Update Photo
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-2">
              <label className="text-[11px] font-medium text-[rgb(var(--foreground))] flex items-center gap-1.5">
                <User
                  size={12}
                  className="text-[rgb(var(--muted-foreground))]"
                />{" "}
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-[12px] bg-[rgb(var(--muted))] border-[rgb(var(--border))]"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-2">
              <label className="text-[11px] font-medium text-[rgb(var(--foreground))] flex items-center gap-1.5">
                <Mail
                  size={12}
                  className="text-[rgb(var(--muted-foreground))]"
                />{" "}
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-[12px] bg-[rgb(var(--muted))] border-[rgb(var(--border))]"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[rgb(var(--border))]" />
              <div className="flex items-center gap-1 text-[10px] text-[rgb(var(--muted-foreground))]">
                <ShieldCheck size={11} /> Change Password
              </div>
              <div className="flex-1 h-px bg-[rgb(var(--border))]" />
            </div>

            {/* Current Password */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-2">
              <label className="text-[11px] font-medium text-[rgb(var(--foreground))] flex items-center gap-1.5">
                <Lock
                  size={12}
                  className="text-[rgb(var(--muted-foreground))]"
                />{" "}
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className="h-9 text-[12px] pr-9 bg-[rgb(var(--muted))] border-[rgb(var(--border))]"
                />
                <button
                  onClick={() => setShowCurrent((p) => !p)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2
                    text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] cursor-pointer"
                >
                  {showCurrent ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-2">
              <label className="text-[11px] font-medium text-[rgb(var(--foreground))] flex items-center gap-1.5">
                <Lock
                  size={12}
                  className="text-[rgb(var(--muted-foreground))]"
                />{" "}
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Enter new password"
                  className="h-9 text-[12px] pr-9 bg-[rgb(var(--muted))] border-[rgb(var(--border))]
                    placeholder:text-[rgb(var(--muted-foreground))]"
                />
                <button
                  onClick={() => setShowNew((p) => !p)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2
                    text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] cursor-pointer"
                >
                  {showNew ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-2">
              <label className="text-[11px] font-medium text-[rgb(var(--foreground))] flex items-center gap-1.5">
                <Lock
                  size={12}
                  className="text-[rgb(var(--muted-foreground))]"
                />{" "}
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-9 text-[12px] pr-9 bg-[rgb(var(--muted))] border-[rgb(var(--border))]
                    placeholder:text-[rgb(var(--muted-foreground))]"
                />
                <button
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2
                    text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>
          </div>

          {/* Update button */}
          <div className="flex justify-end pt-2">
            <button
              className="h-9 px-8 rounded-md bg-[rgb(var(--primary))]
              text-white text-[12px] font-bold
              hover:opacity-90 transition-opacity cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>

        {/* ── Right: illustration / info card ── */}
        <div
          className="hidden lg:flex bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20
          rounded-md p-5 flex-col items-center justify-center gap-4 min-h-65"
        >
          {/* SVG illustration placeholder */}
          <div className="w-full max-w-55">
            <svg
              viewBox="0 0 220 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              {/* Background blob */}
              <ellipse
                cx="110"
                cy="140"
                rx="90"
                ry="30"
                fill="rgb(var(--primary))"
                fillOpacity="0.15"
              />
              {/* Chair */}
              <rect
                x="80"
                y="110"
                width="60"
                height="8"
                rx="4"
                fill="rgb(var(--primary))"
                fillOpacity="0.4"
              />
              <rect
                x="90"
                y="118"
                width="8"
                height="30"
                rx="4"
                fill="rgb(var(--primary))"
                fillOpacity="0.3"
              />
              <rect
                x="122"
                y="118"
                width="8"
                height="30"
                rx="4"
                fill="rgb(var(--primary))"
                fillOpacity="0.3"
              />
              {/* Desk */}
              <rect
                x="60"
                y="118"
                width="100"
                height="6"
                rx="3"
                fill="rgb(var(--primary))"
                fillOpacity="0.5"
              />
              <rect
                x="70"
                y="124"
                width="6"
                height="24"
                rx="3"
                fill="rgb(var(--primary))"
                fillOpacity="0.3"
              />
              <rect
                x="144"
                y="124"
                width="6"
                height="24"
                rx="3"
                fill="rgb(var(--primary))"
                fillOpacity="0.3"
              />
              {/* Laptop */}
              <rect
                x="85"
                y="95"
                width="50"
                height="24"
                rx="3"
                fill="rgb(var(--primary))"
                fillOpacity="0.6"
              />
              <rect
                x="83"
                y="117"
                width="54"
                height="3"
                rx="1.5"
                fill="rgb(var(--primary))"
                fillOpacity="0.4"
              />
              {/* Screen glow */}
              <rect
                x="88"
                y="98"
                width="44"
                height="18"
                rx="2"
                fill="rgb(var(--primary))"
                fillOpacity="0.3"
              />
              {/* Person head */}
              <circle
                cx="110"
                cy="72"
                r="14"
                fill="rgb(var(--primary))"
                fillOpacity="0.5"
              />
              {/* Body */}
              <rect
                x="98"
                y="84"
                width="24"
                height="20"
                rx="5"
                fill="rgb(var(--primary))"
                fillOpacity="0.4"
              />
              {/* Stars */}
              {[
                [40, 40],
                [175, 50],
                [50, 80],
                [170, 90],
                [30, 110],
              ].map(([x, y], i) => (
                <text
                  key={i}
                  x={x}
                  y={y}
                  fontSize="12"
                  fill="rgb(var(--primary))"
                  fillOpacity="0.5"
                >
                  ★
                </text>
              ))}
              {/* Hash tags */}
              <text
                x="155"
                y="75"
                fontSize="14"
                fill="rgb(var(--primary))"
                fillOpacity="0.4"
              >
                #
              </text>
              <text
                x="35"
                y="130"
                fontSize="14"
                fill="rgb(var(--primary))"
                fillOpacity="0.4"
              >
                #
              </text>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[12px] font-semibold text-[rgb(var(--primary))]">
              Manage Your Account
            </p>
            <p className="text-[10px] text-[rgb(var(--muted-foreground))] mt-1 leading-relaxed">
              Keep your profile up to date for the best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
