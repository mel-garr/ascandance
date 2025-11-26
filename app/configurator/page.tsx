"use client";

import React, { useState } from "react";
import { Gauge, Car, Fan, Cpu, Wrench, Cog, X, Menu } from "lucide-react";

type OptionItem = { id: string; name: string; price?: number };
type OptionCategory = { key: string; label: string; items: OptionItem[] };

const COLORS = ["red", "gold", "white"] as const;
type Color = (typeof COLORS)[number];
const IMAGES_COUNT = 10;

export default function EveConfiguratorSimple() {
  const [color, setColor] = useState<Color>("red");
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [frame, setFrame] = useState(1);
  const [isPreorderOpen, setPreorderOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const OPTIONS: OptionCategory[] = [
    { key: "powerDrive", label: "Power & Drive", items: [{ id: "1wd", name: "1WD", price: 1500 }, { id: "2wd", name: "2WD", price: 3000 }, { id: "3wd", name: "3WD", price: 4500 }] },
    { key: "battery", label: "Battery", items: [{ id: "5kw", name: "5kW", price: 1500 }, { id: "10kw", name: "10kW", price: 3000 }, { id: "15kw", name: "15kW", price: 4000 }, { id: "20kw", name: "20kW", price: 5000 }] },
    { key: "window", label: "Window", items: [{ id: "manual", name: "Manual" }, { id: "auto", name: "Auto", price: 500 }] },
    { key: "interior", label: "Interior", items: [{ id: "classic", name: "Classic" }, { id: "premiumInterior", name: "Premium", price: 500 }] },
    { key: "roof", label: "Roof", items: [{ id: "composite", name: "Composite" }, { id: "glassRoof", name: "Glass Roof", price: 200 }] },
    { key: "glass", label: "Glass", items: [{ id: "transparent", name: "Transparent" }, { id: "blackTint", name: "Black Tint", price: 50 }, { id: "silverTint", name: "Silver Tint", price: 50 }] },
  ];

  const [selections, setSelections] = useState<Map<string, string>>(
    new Map(OPTIONS.map((cat) => [cat.key, cat.items[0].id]))
  );

  const price = Array.from(selections.entries()).reduce((acc, [key, id]) => {
    const cat = OPTIONS.find((o) => o.key === key);
    const item = cat?.items.find((i) => i.id === id);
    return acc + (item?.price || 0);
  }, 5000);

  const prevFrame = () => { if(frame > 1) setFrame(frame - 1); };
  const nextFrame = () => { if(frame < IMAGES_COUNT) setFrame(frame + 1); };

  const handleSelect = (catKey: string, itemId: string) => {
    const copy = new Map(selections);
    copy.set(catKey, itemId);
    setSelections(copy);
  };

  const sendEmail = async () => {
    if (!email) return setError("Please enter your email");

    setSending(true);
    setError("");
    setSent(false);

    try {
      const imageUrl =
        color === "red"
          ? `/red/red${frame}.png`
          : color === "gold"
          ? `/gold/GOLD${frame}.png`
          : `/white/white${frame}.png`;

      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          config: Object.fromEntries(selections),
          price,
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Email failed");
      setSent(true);
    } catch (e) {
      console.error(e);
      setError("Failed to send email. Try again.");
    }

    setSending(false);
  };

  const imgSrc =
    color === "red"
      ? `/red/red${frame}.png`
      : color === "gold"
      ? `/gold/GOLD${frame}.png`
      : `/white/white${frame}.png`;

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      {/* CAR IMAGE WITH NAVIGATION - FULL SCREEN */}
      <div className="absolute inset-0">
        {/* Navbar with Logo - Overlaying the image */}
        <nav className="absolute top-0 left-0 right-0 z-50 h-16 md:h-20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <a href="/" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/logoWhite.png" 
                  alt="Ascendance" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain" 
                />
              </a>
              
              {/* Back to Home Link */}
              <a 
                href="/" 
                className="text-white text-sm md:text-base hover:opacity-70 transition-opacity"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </nav>
        {/* Click areas for navigation */}
        <div className="absolute left-0 w-1/2 h-full cursor-pointer z-10" onClick={prevFrame}></div>
        <div className="absolute right-0 w-1/2 h-full cursor-pointer z-10" onClick={nextFrame}></div>

        {/* Left Navigation Arrow */}
        {frame > 1 && (
          <div 
            className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20 cursor-pointer group" 
            onClick={prevFrame}
          >
            <div className="flex gap-0 items-center text-6xl md:text-8xl font-bold leading-none">
              <span className="text-white/30 group-hover:text-white/50 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>‹</span>
              <span className="text-white/50 group-hover:text-white/70 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}>‹</span>
              <span className="text-white/80 group-hover:text-white transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]">‹</span>
            </div>
          </div>
        )}

        {/* Right Navigation Arrow */}
        {frame < IMAGES_COUNT && (
          <div 
            className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 cursor-pointer group" 
            onClick={nextFrame}
          >
            <div className="flex gap-0 items-center text-6xl md:text-8xl font-bold leading-none">
              <span className="text-white/80 group-hover:text-white transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]">›</span>
              <span className="text-white/50 group-hover:text-white/70 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}>›</span>
              <span className="text-white/30 group-hover:text-white/50 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>›</span>
            </div>
          </div>
        )}

        {/* Frame counter */}
        <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
          {frame} / {IMAGES_COUNT}
        </div>

        <img src={imgSrc} className="w-full h-full object-cover select-none pointer-events-none" />
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden fixed left-4 top-24 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 border border-white/30"
      >
        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE OPTIONS DRAWER */}
      {showMobileMenu && (
        <div className="md:hidden fixed left-0 top-36 bottom-0 w-64 bg-black/95 backdrop-blur-md z-30 overflow-y-auto border-r border-white/20">
          <div className="p-4 space-y-4">
            {OPTIONS.map((cat) => {
              const selectedId = selections.get(cat.key);
              return (
                <div key={cat.key} className="space-y-2">
                  <div className="text-sm font-semibold text-white/70">{cat.label}</div>
                  <div className="space-y-1">
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(cat.key, item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          selectedId === item.id
                            ? "bg-blue-600 text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                      >
                        {item.name}
                        {item.price && <span className="text-xs ml-2">+${item.price.toLocaleString()}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DESKTOP LEFT OPTIONS */}
      <div className="hidden md:flex absolute left-20 lg:left-28 top-1/2 -translate-y-1/2 flex-col gap-4 z-30">
        {[
          { key: "powerDrive", icon: <Gauge size={24} /> },
          { key: "battery", icon: <Car size={24} /> },
          { key: "window", icon: <Fan size={24} /> },
          { key: "interior", icon: <Cpu size={24} /> },
          { key: "roof", icon: <Wrench size={24} /> },
          { key: "glass", icon: <Cog size={24} /> },
        ].map((opt) => {
          const category = OPTIONS.find((o) => o.key === opt.key);
          const selectedId = selections.get(opt.key);
          const isActive = activeOption === opt.key;

          return (
            <div key={opt.key} className="relative flex items-center gap-3">
              <button
                onClick={() => setActiveOption(isActive ? null : opt.key)}
                className={`w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/30 transition ${
                  isActive ? "scale-110 bg-black/60" : "hover:scale-105 hover:bg-black/50"
                }`}
              >
                {isActive ? <X size={24} /> : opt.icon}
              </button>

              {isActive && (
                <div className="flex gap-2 ml-2 max-w-md overflow-x-auto">
                  {category?.items.map((it) => {
                    const selected = selectedId === it.id;
                    return (
                      <div
                        key={it.id}
                        onClick={() => handleSelect(opt.key, it.id)}
                        className={`flex-shrink-0 p-2 rounded-lg cursor-pointer border min-w-[70px] text-center text-sm backdrop-blur-sm ${
                          selected
                            ? "bg-blue-600 text-white border-blue-400"
                            : "bg-black/40 border-white/20 text-white hover:bg-black/50"
                        } transition`}
                      >
                        {it.name}
                        {it.price && <div className="text-xs mt-1">+${it.price.toLocaleString()}</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* COLORS - Right side */}
      <div className="hidden md:flex absolute right-20 lg:right-28 top-1/2 -translate-y-1/2 flex-col gap-4 z-30">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full border-4 shadow-lg transition-all ${
              color === c ? "border-white scale-110" : "border-white/50 hover:scale-105"
            }`}
            style={{
              backgroundColor:
                c === "red" ? "#d62828" : c === "gold" ? "#FFD700" : "#ffffff",
            }}
          />
        ))}
      </div>

      {/* Mobile color selector */}
      <div className="md:hidden fixed right-4 top-24 z-40 flex gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-10 h-10 rounded-full border-2 shadow-lg transition-all ${
              color === c ? "border-white scale-110" : "border-white/50"
            }`}
            style={{
              backgroundColor:
                c === "red" ? "#d62828" : c === "gold" ? "#FFD700" : "#ffffff",
            }}
          />
        ))}
      </div>

      {/* BOTTOM CONFIG SUMMARY */}
      <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-40 md:w-3/4 max-w-4xl bg-white/90 text-black rounded-xl p-3 md:p-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex-1 w-full md:w-auto">
            <div className="font-semibold text-base md:text-lg mb-2">Your Configuration</div>
            <div className="text-xs md:text-sm max-h-24 md:max-h-32 overflow-y-auto">
              {Array.from(selections.entries()).map(([key, id]) => {
                const cat = OPTIONS.find((o) => o.key === key);
                const item = cat?.items.find((i) => i.id === id);
                return (
                  <div key={key} className="text-xs md:text-sm">
                    {cat?.label}: {item?.name} {item?.price ? `+$${item.price}` : ""}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row md:flex-col lg:flex-row items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="font-bold text-lg md:text-xl">${price.toLocaleString()}</div>
            <button
              onClick={() => setPreorderOpen(true)}
              className="px-4 md:px-6 py-2 bg-black text-white rounded-lg shadow hover:opacity-90 transition text-sm md:text-base whitespace-nowrap"
            >
              Preorder
            </button>
          </div>
        </div>
      </div>

      {/* PREORDER MODAL */}
      {isPreorderOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setPreorderOpen(false)}
        >
          <div
            className="bg-white text-black rounded-xl p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex justify-between items-center">
              <div className="text-lg md:text-xl font-bold">Send Your Configuration</div>
              <button onClick={() => setPreorderOpen(false)} className="text-black font-bold text-xl">✕</button>
            </div>

            <img src={imgSrc} className="w-full rounded-lg mb-4" />

            <div className="space-y-2 text-xs md:text-sm mb-4">
              {Array.from(selections.entries()).map(([key, id]) => {
                const cat = OPTIONS.find((o) => o.key === key);
                const item = cat?.items.find((i) => i.id === id);
                return (
                  <div key={key}>
                    <strong>{cat?.label}:</strong> {item?.name} {item?.price ? `+$${item.price}` : ""}
                  </div>
                );
              })}
              <div className="text-base md:text-lg font-bold pt-2 border-t">
                Total: ${price.toLocaleString()}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 md:p-3 mt-1 text-sm md:text-base"
              />
            </div>

            {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
            {sent && <div className="mt-2 text-green-600 text-sm">Email sent successfully!</div>}

            <button
              onClick={sendEmail}
              disabled={sending}
              className="mt-4 w-full bg-black text-white py-3 rounded-lg disabled:opacity-50 text-sm md:text-base font-semibold"
            >
              {sending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}