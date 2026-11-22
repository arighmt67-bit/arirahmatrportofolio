"use client";

import dynamic from "next/dynamic";

export const LazyCommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
