"use client";

import { Button } from "@/components/ui/button";
import { useRegistration } from "./registration-provider";
import type { CourseRegistrationValue } from "@/lib/course-registration";
import type { ComponentProps } from "react";

interface StartLearningButtonProps extends ComponentProps<typeof Button> {
  course?: CourseRegistrationValue;
  children?: React.ReactNode;
}

export function StartLearningButton({ course, children = "Start Learning", onClick, ...props }: StartLearningButtonProps) {
  const { openRegistration } = useRegistration();

  return (
    <Button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        openRegistration(course);
      }}
    >
      {children}
    </Button>
  );
}
