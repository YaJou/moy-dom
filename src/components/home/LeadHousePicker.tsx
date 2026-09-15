"use client";

import { realHouses } from "@/data/houses";
import { getHouseCover } from "@/lib/house-images";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

interface LeadHousePickerProps {
  value: number | null;
  onChange: (houseId: number | null) => void;
  /** Показывать только дома этого города */
  city?: string;
  label?: string;
  required?: boolean;
  allowSkip?: boolean;
  skipLabel?: string;
  error?: string | null;
  className?: string;
}

export function LeadHousePicker({
  value,
  onChange,
  city,
  label = "Какой дом интересует",
  required = false,
  allowSkip = true,
  skipLabel = "Ещё не выбрал",
  error,
  className,
}: LeadHousePickerProps) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const houses = useMemo(() => {
    if (!city) return realHouses;
    return realHouses.filter((h) => h.city === city);
  }, [city]);

  const selected =
    value != null ? houses.find((h) => h.id === value) ?? null : null;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className={cn("lead-house-picker", className)}>
      <label htmlFor={`${uid}-trigger`} className="viewing-form-label">
        {label}
        {required ? " *" : ""}
      </label>

      <button
        id={`${uid}-trigger`}
        type="button"
        className={cn(
          "lead-house-trigger",
          open && "is-open",
          error && "is-error"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? (
          <span className="lead-house-selected">
            <span className="lead-house-thumb">
              <Image
                src={getHouseCover(selected)}
                alt=""
                width={56}
                height={42}
                className="lead-house-thumb-img"
              />
            </span>
            <span className="lead-house-meta">
              <span className="lead-house-title">
                {selected.area} м² · {selected.district || selected.city}
              </span>
              <span className="lead-house-price">
                {formatPrice(selected.price)}
              </span>
            </span>
          </span>
        ) : (
          <span className="lead-house-placeholder">
            {houses.length === 0
              ? "В этом городе пока нет домов"
              : allowSkip
                ? "Выберите дом или пропустите"
                : "Выберите дом"}
          </span>
        )}
        <span className="lead-house-chevron" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul className="lead-house-menu" role="listbox">
          {allowSkip && (
            <li role="option" aria-selected={value == null}>
              <button
                type="button"
                className={cn(
                  "lead-house-option",
                  value == null && "is-selected"
                )}
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
              >
                <span className="lead-house-option-skip">{skipLabel}</span>
              </button>
            </li>
          )}
          {houses.length === 0 ? (
            <li className="lead-house-option-skip" role="presentation">
              Нет домов в {city}
            </li>
          ) : (
            houses.map((house) => {
              const isSelected = house.id === value;
              return (
                <li key={house.id} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    className={cn(
                      "lead-house-option",
                      isSelected && "is-selected"
                    )}
                    onClick={() => {
                      onChange(house.id);
                      setOpen(false);
                    }}
                  >
                    <span className="lead-house-thumb">
                      <Image
                        src={getHouseCover(house)}
                        alt=""
                        width={64}
                        height={48}
                        className="lead-house-thumb-img"
                      />
                    </span>
                    <span className="lead-house-meta">
                      <span className="lead-house-title">
                        {house.area} м² · {house.district || house.city}
                      </span>
                      <span className="lead-house-sub">
                        {house.bedrooms ?? house.rooms} спальни · участок{" "}
                        {house.land} сот.
                      </span>
                      <span className="lead-house-price">
                        {formatPrice(house.price)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}

      {error ? <p className="viewing-form-error">{error}</p> : null}
    </div>
  );
}
