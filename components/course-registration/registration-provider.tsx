"use client";

import { createContext, useCallback, useContext, useState } from "react";
import dynamic from "next/dynamic";
import type { CourseRegistrationValue } from "@/lib/course-registration";

const RegistrationModal = dynamic(
  () => import("./registration-modal").then((m) => m.RegistrationModal),
  { ssr: false }
);

interface RegistrationContextValue {
  openRegistration: (course?: CourseRegistrationValue) => void;
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefillCourse, setPrefillCourse] = useState<CourseRegistrationValue | undefined>();

  const openRegistration = useCallback((course?: CourseRegistrationValue) => {
    setPrefillCourse(course);
    setOpen(true);
  }, []);

  return (
    <RegistrationContext.Provider value={{ openRegistration }}>
      {children}
      {open && (
        <RegistrationModal
          open={open}
          prefillCourse={prefillCourse}
          onClose={() => setOpen(false)}
        />
      )}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
}
