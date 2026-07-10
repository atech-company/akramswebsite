export const SKILL_LEVELS = [
  { value: "none", label: "No experience", labelAr: "بدون خبرة" },
  { value: "beginner", label: "Beginner", labelAr: "مبتدئ" },
  { value: "intermediate", label: "Intermediate", labelAr: "متوسط" },
  { value: "advanced", label: "Advanced", labelAr: "متقدم" },
] as const;

export const REGISTRATION_COURSES = [
  { value: "electronic_fundamentals", label: "Electronic Fundamentals" },
  { value: "electronic_automation_level_1", label: "Electronic and Automation System Level 1" },
  { value: "learn_pcb_design", label: "Learn PCB Design" },
  { value: "fpv_drone_engineering", label: "FPV Drone Engineering — From Physics to Flight" },
  { value: "embedded_pcb_bootcamp", label: "Embedded System & PCB Design Bootcamp" },
] as const;

export const EXPECTED_OUTCOMES = [
  { value: "learn_basics", label: "Learn the fundamentals", labelAr: "تعلم الأساسيات" },
  { value: "implement_projects", label: "Build real projects", labelAr: "تنفيذ مشاريع" },
  { value: "academic_development", label: "Academic self-development", labelAr: "تطوير ذاتي أكاديمي" },
  { value: "work_in_field", label: "Work in the field", labelAr: "العمل في المجال" },
  { value: "other", label: "Other", labelAr: "أخرى" },
] as const;

export const HEAR_ABOUT_OPTIONS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "friend", label: "Friend" },
  { value: "ads", label: "Ads" },
] as const;

export const PAYMENT_METHODS = [
  { value: "omt", label: "OMT" },
  { value: "wish_money", label: "Wish Money" },
  { value: "usdt", label: "USDT" },
] as const;

export type CourseRegistrationValue = (typeof REGISTRATION_COURSES)[number]["value"];
export type SkillLevel = (typeof SKILL_LEVELS)[number]["value"];

export function getCourseLabel(value: string) {
  return REGISTRATION_COURSES.find((c) => c.value === value)?.label ?? value;
}

export function getSkillLevelLabel(value: string) {
  const item = SKILL_LEVELS.find((l) => l.value === value);
  return item ? `${item.label} / ${item.labelAr}` : value;
}

export function getOutcomeLabels(values: string[]) {
  return values.map((v) => {
    const item = EXPECTED_OUTCOMES.find((o) => o.value === v);
    return item ? `${item.labelAr} (${item.label})` : v;
  });
}
