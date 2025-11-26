"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Gauge, Car, Fan, Cpu, Wrench, Cog, X } from "lucide-react";

type OptionItem = { id: string; name: string; price?: number };
type OptionCategory = { key: string; label: string; items: OptionItem[] };

const COLORS = ["red", "gold", "white"] as const;
type Color = (typeof COLORS)[number];

const IMAGES_COUNT = 10;

export default function EveConfigurator360() {
  const [color, setColor] = useState<Color>("red");
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [frame, setFrame] = useState(1);
  const [isPreorderOpen, setPreorderOpen] = useState(false);

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
  }, 12000);

  // Rotation
  const carRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);

  const prevFrame = () => setFrame((f) => (f === 1 ? IMAGES_COUNT : f - 1));
  const nextFrame = () => setFrame((f) => (f === IMAGES_COUNT ? 1 : f + 1));

  const onPointerDown = (e: React.PointerEvent) => { dragging.current = true; startX.current = e.clientX; };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    if (dx > 10) { prevFrame(); startX.current = e.clientX; } 
    else if (dx < -10) { nextFrame(); startX.current = e.clientX; }
  };
  const onPointerUp = () => dragging.current = false;

  // Icons
  const LEFT_ICONS = [
    { key: "powerDrive", icon: <Gauge size={28} /> },
    { key: "battery", icon: <Car size={28} /> },
    { key: "window", icon: <Fan size={28} /> },
    { key: "interior", icon: <Cpu size={28} /> },
    { key: "roof", icon: <Wrench size={28} /> },
    { key: "glass", icon: <Cog size={28} /> },
  ];

  const handleSelect = (catKey: string, itemId: string) => {
    const copy = new Map(selections);
    copy.set(catKey, itemId);
    setSelections(copy);
  };

  // Ref for active icon dropdown
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeRef.current && !activeRef.current.contains(e.target as Node)) {
        setActiveOption(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      <Navbar alwaysVisible darkText />

      <div className="absolute inset-0 cursor-grab" ref={carRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
        <img src={color === "red" ? `/red/red${frame}.png` : color === "gold" ? `/gold/GOLD${frame}.png` : `/white/white${frame}.png`} className="absolute inset-0 w-full h-full object-cover select-none"/>
      </div>

      {/* Left icons */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
        {LEFT_ICONS.map((opt) => {
          const category = OPTIONS.find((o) => o.key === opt.key);
          const selectedId = selections.get(opt.key) || category?.items[0].id;
          const isActive = activeOption === opt.key;

          return (
            <div key={opt.key} ref={isActive ? activeRef : null} className="relative flex items-center gap-4">
              <button
                onClick={() => setActiveOption(isActive ? null : opt.key)}
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition ${isActive ? "scale-125" : "hover:scale-110"}`}
              >
                {isActive ? <X size={28} /> : opt.icon}
              </button>

              {isActive && (
                <div className="flex gap-2 overflow-x-auto py-1 ml-6">
                  {category?.items.map((it) => {
                    const isSelected = selectedId === it.id;
                    return (
                      <div key={it.id} onClick={() => handleSelect(opt.key, it.id)} className={`flex-shrink-0 p-2 rounded-lg cursor-pointer border min-w-[80px] text-center ${isSelected ? "bg-blue-600 text-white border-blue-400" : "bg-white/10 border-white/20 text-white"} hover:bg-white/20 transition`}>
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

      {/* Right colors */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
        {COLORS.map((c) => (
          <button key={c} onClick={() => setColor(c)} className={`w-20 h-20 rounded-full border-4 shadow-lg transition-all ${color === c ? "border-white scale-110" : "border-white/50"}`} style={{ backgroundColor: c === "red" ? "#d62828" : c === "gold" ? "#FFD700" : "#ffffff" }}/>
        ))}
      </div>

      {/* Bottom preorder */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-11/12 md:w-3/4 bg-white/90 text-black rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex-1">
          <div className="font-semibold text-lg md:text-xl mb-2">Your Configuration</div>
          <div className="text-sm md:text-base max-h-32 overflow-y-auto">
            {Array.from(selections.entries()).map(([key, id]) => {
              const cat = OPTIONS.find((o) => o.key === key);
              const item = cat?.items.find((i) => i.id === id);
              return <div key={key}>{cat?.label}: {item?.name} {item?.price ? `+${item.price.toLocaleString()}` : ""}</div>;
            })}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="font-bold text-lg md:text-2xl">${price.toLocaleString()}</div>
          <button onClick={() => setPreorderOpen(true)} className="px-6 py-2 bg-black text-white rounded-lg shadow hover:opacity-90 transition">Preorder</button>
        </div>
      </div>

      {/* PREORDER MODAL */}
      {isPreorderOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPreorderOpen(false)}>
          <div className="bg-white text-black rounded-xl p-6 w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex justify-between items-center">
              <div className="text-xl font-bold">Confirm Your Configuration</div>
              <button onClick={() => setPreorderOpen(false)} className="text-black font-bold">✕</button>
            </div>
            <img src={color === "red" ? `/red/red${frame}.png` : color === "gold" ? `/gold/GOLD${frame}.png` : `/white/white${frame}.png`} className="w-full h-auto object-contain mb-4"/>
            <div className="flex flex-col gap-2 mb-4">
              {Array.from(selections.entries()).map(([key, id]) => {
                const cat = OPTIONS.find((o) => o.key === key);
                const item = cat?.items.find((i) => i.id === id);
                return <div key={key}>{cat?.label}: {item?.name} {item?.price ? `+${item.price.toLocaleString()}` : ""}</div>;
              })}
            </div>
            <div className="mb-4">
              <input type="email" placeholder="Your email" className="w-full p-2 border border-gray-300 rounded"/>
            </div>
            <button className="w-full bg-black text-white p-2 rounded">Send Configuration</button>
          </div>
        </div>
      )}
    </div>
  );
}
