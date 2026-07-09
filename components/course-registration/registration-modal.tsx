"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  EXPECTED_OUTCOMES,
  HEAR_ABOUT_OPTIONS,
  PAYMENT_METHODS,
  REGISTRATION_COURSES,
  SKILL_LEVELS,
  type CourseRegistrationValue,
} from "@/lib/course-registration";
import { postApi, uploadPublicImage } from "@/services/api";
import { ImageUploadField } from "@/components/shared/image-upload-field";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  whatsapp: z.string().min(8, "WhatsApp number is required"),
  email: z.string().email("Valid email is required"),
  age: z.number({ error: "Age is required" }).min(10).max(100),
  country: z.string().min(2, "Country is required"),
  photo: z.string().optional(),
  major: z.string().min(2, "Major is required"),
  skill_level: z.enum(["none", "beginner", "intermediate", "advanced"], { message: "Select your level" }),
  course_name: z.enum([
    "electronic_fundamentals",
    "electronic_automation_level_1",
    "learn_pcb_design",
    "fpv_drone_engineering",
    "embedded_pcb_bootcamp",
  ], { message: "Select a course" }),
  why_join: z.string().min(10, "Please tell us why you want to join"),
  expected_outcomes: z.array(z.enum([
    "learn_basics", "implement_projects", "academic_development", "work_in_field", "other",
  ])).min(1, "Select at least one goal"),
  expected_outcomes_other: z.string().optional(),
  hear_about: z.enum(["facebook", "instagram", "friend", "ads"], { message: "Select how you heard about us" }),
  payment_method: z.enum(["omt", "wish_money", "usdt"], { message: "Select payment method" }),
}).superRefine((data, ctx) => {
  if (data.expected_outcomes.includes("other") && !data.expected_outcomes_other?.trim()) {
    ctx.addIssue({ code: "custom", message: "Please specify your other goal", path: ["expected_outcomes_other"] });
  }
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { title: "Personal Info", titleAr: "المعلومات الشخصية" },
  { title: "Background", titleAr: "الخلفية الأكاديمية" },
  { title: "Course", titleAr: "الدورة" },
  { title: "Goals & Payment", titleAr: "الأهداف والدفع" },
];

const stepFields: (keyof FormData)[][] = [
  ["name", "whatsapp", "email", "age", "country"],
  ["major", "skill_level"],
  ["course_name"],
  ["why_join", "expected_outcomes", "expected_outcomes_other", "hear_about", "payment_method"],
];

interface RegistrationModalProps {
  open: boolean;
  prefillCourse?: CourseRegistrationValue;
  onClose: () => void;
}

export function RegistrationModal({ open, prefillCourse, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      age: 18,
      country: "",
      photo: "",
      major: "",
      skill_level: undefined,
      course_name: undefined,
      why_join: "",
      expected_outcomes: [],
      expected_outcomes_other: "",
      hear_about: undefined,
      payment_method: undefined,
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue, reset } = form;
  const outcomes = watch("expected_outcomes") ?? [];

  useEffect(() => {
    if (open) {
      reset({
        name: "",
        whatsapp: "",
        email: "",
        age: 18,
        country: "",
        photo: "",
        major: "",
        skill_level: undefined,
        course_name: prefillCourse,
        why_join: "",
        expected_outcomes: [],
        expected_outcomes_other: "",
        hear_about: undefined,
        payment_method: undefined,
      });
      setStep(0);
      setDone(false);
    }
  }, [open, prefillCourse, reset]);

  if (!open) return null;

  const next = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleOutcome = (value: FormData["expected_outcomes"][number]) => {
    const current = outcomes;
    if (current.includes(value)) {
      setValue("expected_outcomes", current.filter((v) => v !== value), { shouldValidate: true });
    } else {
      setValue("expected_outcomes", [...current, value], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await postApi("/course-registrations", {
        ...data,
        photo: data.photo || undefined,
        expected_outcomes_other: data.expected_outcomes.includes("other") ? data.expected_outcomes_other : undefined,
      });
      setDone(true);
      toast.success("Registration submitted successfully!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = "flex min-h-[48px] w-full rounded-[24px] border border-white/10 bg-white/5 px-5 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="glass rounded-[24px] border border-white/10 w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <div>
            <h2 className="text-xl font-bold">Course Registration</h2>
            <p className="text-xs text-muted mt-1">تسجيل في الدورة — Step {step + 1} of {STEPS.length}</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-white/5" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!done && (
          <div className="flex gap-2 px-6 pt-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex-1">
                <div className={cn("h-1 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-white/10")} />
                <p className="text-[10px] text-muted mt-1 truncate hidden sm:block">{s.titleAr}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {done ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-muted mb-6">تم استلام طلبك. سنتواصل معك قريباً عبر WhatsApp أو البريد الإلكتروني.</p>
              <Button onClick={onClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {step === 0 && (
                <>
                  <Field label="Full Name / الاسم الكامل" error={errors.name?.message}>
                    <Input placeholder="Your name" {...register("name")} />
                  </Field>
                  <Field label="WhatsApp Number / رقم الواتساب" error={errors.whatsapp?.message}>
                    <Input placeholder="+961 XX XXX XXX" {...register("whatsapp")} />
                  </Field>
                  <Field label="Email / البريد الإلكتروني" error={errors.email?.message}>
                    <Input type="email" placeholder="you@email.com" {...register("email")} />
                  </Field>
                  <Field label="Age / العمر" error={errors.age?.message}>
                    <Input type="number" min={10} max={100} {...register("age", { valueAsNumber: true })} />
                  </Field>
                  <Field label="Country / البلد" error={errors.country?.message}>
                    <Input placeholder="Lebanon" {...register("country")} />
                  </Field>
                  <ImageUploadField
                      label="Profile Photo / صورة شخصية"
                      value={watch("photo") ?? ""}
                      onChange={(url) => setValue("photo", url, { shouldValidate: true })}
                      onUpload={uploadPublicImage}
                      optional
                    />
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Major / التخصص" error={errors.major?.message}>
                    <Input placeholder="e.g. Electrical Engineering" {...register("major")} />
                  </Field>
                  <Field label="Programming & Electronics Level / مستواك في البرمجة والإلكترونيات" error={errors.skill_level?.message}>
                    <div className="grid grid-cols-2 gap-2">
                      {SKILL_LEVELS.map((level) => (
                        <label
                          key={level.value}
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all text-center",
                            watch("skill_level") === level.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-white/10 hover:border-white/20"
                          )}
                        >
                          <input type="radio" value={level.value} className="sr-only" {...register("skill_level")} />
                          <span className="text-sm font-medium">{level.label}</span>
                          <span className="text-xs text-muted mt-1">{level.labelAr}</span>
                        </label>
                      ))}
                    </div>
                  </Field>
                </>
              )}

              {step === 2 && (
                <Field label="Select Course / اختر الدورة" error={errors.course_name?.message}>
                  <div className="space-y-2">
                    {REGISTRATION_COURSES.map((course) => (
                      <label
                        key={course.value}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all",
                          watch("course_name") === course.value
                            ? "border-primary bg-primary/10"
                            : "border-white/10 hover:border-white/20"
                        )}
                      >
                        <input type="radio" value={course.value} className="sr-only" {...register("course_name")} />
                        <span className="text-sm font-medium">{course.label}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              )}

              {step === 3 && (
                <>
                  <Field label="لماذا تريد الانضمام لهذه الدورة؟" error={errors.why_join?.message}>
                    <textarea className={cn(fieldClass, "min-h-[100px]")} placeholder="اكتب سبب انضمامك..." {...register("why_join")} />
                  </Field>

                  <Field label="ماذا تتوقع أن تحقق بعد انتهاء الدورة؟" error={errors.expected_outcomes?.message}>
                    <div className="space-y-2">
                      {EXPECTED_OUTCOMES.map((opt) => (
                        <label
                          key={opt.value}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                            outcomes.includes(opt.value) ? "border-primary bg-primary/10" : "border-white/10"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={outcomes.includes(opt.value)}
                            onChange={() => toggleOutcome(opt.value)}
                            className="rounded accent-primary"
                          />
                          <span className="text-sm">{opt.labelAr} — {opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </Field>

                  {outcomes.includes("other") && (
                    <Field label="Other goal / هدف آخر" error={errors.expected_outcomes_other?.message}>
                      <Input placeholder="Specify..." {...register("expected_outcomes_other")} />
                    </Field>
                  )}

                  <Field label="كيف سمعت عن الدورة؟" error={errors.hear_about?.message}>
                    <div className="grid grid-cols-2 gap-2">
                      {HEAR_ABOUT_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={cn(
                            "flex items-center justify-center p-3 rounded-xl border cursor-pointer text-sm",
                            watch("hear_about") === opt.value ? "border-primary bg-primary/10" : "border-white/10"
                          )}
                        >
                          <input type="radio" value={opt.value} className="sr-only" {...register("hear_about")} />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field label="ما هي طريقة الدفع؟" error={errors.payment_method?.message}>
                    <div className="grid grid-cols-3 gap-2">
                      {PAYMENT_METHODS.map((opt) => (
                        <label
                          key={opt.value}
                          className={cn(
                            "flex items-center justify-center p-3 rounded-xl border cursor-pointer text-sm font-medium",
                            watch("payment_method") === opt.value ? "border-primary bg-primary/10" : "border-white/10"
                          )}
                        >
                          <input type="radio" value={opt.value} className="sr-only" {...register("payment_method")} />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </Field>
                </>
              )}
            </form>
          )}
        </div>

        {!done && (
          <div className="flex gap-3 p-6 border-t border-white/8">
            {step > 0 && (
              <Button type="button" variant="secondary" onClick={back} className="flex-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={next} className="flex-1">
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit(onSubmit)} disabled={submitting} className="flex-1">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Registration"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm text-muted mb-2 block">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
