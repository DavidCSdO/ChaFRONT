"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function PageTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    
    // Only track once per page load to avoid strict mode double invocation
    tracked.current = true;
    
    // Check if we already tracked this session (in memory)
    if (!sessionStorage.getItem("visited")) {
      supabase.from("page_views").insert([{ path: "/" }]).then(({ error }) => {
        if (!error) {
          sessionStorage.setItem("visited", "true");
        }
      });
    }
  }, []);

  return null;
}
