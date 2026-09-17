"use client";

import { IconCheck } from "@/components/home/icons";
import { cn } from "@/lib/utils";

interface FormSuccessPanelProps {
  title?: string;
  description: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
}

/** Успех прямо на месте формы с анимацией появления. */
export function FormSuccessPanel({
  title = "Заявка отправлена",
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  className,
}: FormSuccessPanelProps) {
  return (
    <div
      className={cn("form-success-panel", className)}
      role="status"
      aria-live="polite"
    >
      <div className="form-success-panel-inner">
        <span className="form-success-panel-icon" aria-hidden>
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="form-success-panel-title">{title}</h3>
        <p className="form-success-panel-text">{description}</p>
        {(primaryLabel || secondaryLabel) && (
          <div className="form-success-panel-actions">
            {primaryLabel && onPrimary ? (
              <button
                type="button"
                className="btn-primary form-success-panel-btn"
                onClick={onPrimary}
              >
                {primaryLabel}
              </button>
            ) : null}
            {secondaryLabel && onSecondary ? (
              <button
                type="button"
                className="btn-secondary form-success-panel-btn"
                onClick={onSecondary}
              >
                {secondaryLabel}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
