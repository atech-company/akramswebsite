"use client";

import { StartLearningButton } from "@/components/course-registration/start-learning-button";
import type { CourseRegistrationValue } from "@/lib/course-registration";

const SLUG_TO_COURSE: Record<string, CourseRegistrationValue> = {
  "pcb-design-microcontrollers": "learn_pcb_design",
  "avr-embedded-systems": "electronic_fundamentals",
  "iot-esp32-smart-board": "embedded_pcb_bootcamp",
  "arduino-robotics": "electronic_automation_level_1",
};

interface EnrollButtonProps {
  slug: string;
  className?: string;
}

export function EnrollButton({ slug, className }: EnrollButtonProps) {
  const course = SLUG_TO_COURSE[slug];

  return (
    <StartLearningButton className={className} size="lg" course={course}>
      Enroll Now
    </StartLearningButton>
  );
}
