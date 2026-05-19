"use client";

import { useState, useCallback } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/skeleton";

type ImageWithSkeletonProps = Omit<ImageProps, "onLoad" | "onError"> & {
  /** Additional classes for the wrapper */
  wrapperClassName?: string;
  /** Custom skeleton – falls back to the default shimmer block */
  skeleton?: React.ReactNode;
  /** Aspect ratio for the default skeleton (ignored when `skeleton` is provided) */
  skeletonAspectRatio?: string;
};

/**
 * Wraps Next.js `<Image>` and shows a shimmer skeleton placeholder until the
 * image has fully loaded (or encountered an error).
 *
 * The skeleton inherits the image's `fill` behaviour when used inside a relative
 * container — it stretches to cover the same area.  For non‑fill images the
 * skeleton respects the provided `skeletonAspectRatio`.
 */
export function ImageWithSkeleton({
  wrapperClassName,
  skeleton,
  skeletonAspectRatio = "16/10",
  className,
  alt,
  ...imageProps
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  // On error we also remove the skeleton so the broken-image icon (or alt text) shows.
  const onError = useCallback(() => setLoaded(true), []);

  const defaultSkeleton = imageProps.fill ? (
    <Skeleton className="absolute inset-0 rounded-none" />
  ) : (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-2xl bg-slate-200/70"
      style={{ aspectRatio: skeletonAspectRatio }}
    >
      <Skeleton className="absolute inset-0 rounded-none" />
    </div>
  );

  return (
    <div
      className={cn(
        "relative",
        imageProps.fill && "h-full w-full",
        wrapperClassName,
      )}
    >
      {/* Skeleton overlay */}
      {!loaded && (skeleton ?? defaultSkeleton)}

      <Image
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        {...imageProps}
      />
    </div>
  );
}
