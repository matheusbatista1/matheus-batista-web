"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/application/validation/contactSchema";
import { Send } from "lucide-react";

type ModalState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [modalState, setModalState] = useState<ModalState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormInput) {
    if (data.honeypot) return;

    setModalState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setModalState("sent");
        reset();
      } else {
        setModalState("error");
      }
    } catch {
      setModalState("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Honeypot - campo oculto anti-bot */}
        <input
          type="text"
          {...register("honeypot")}
          className="absolute -left-[9999px] opacity-0"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            placeholder={t("form.name")}
            className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-text-primary transition-colors"
          />
          {errors.name && (
            <span className="text-xs text-error">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="email"
            placeholder={t("form.email")}
            className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-text-primary transition-colors"
          />
          {errors.email && (
            <span className="text-xs text-error">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...register("subject")}
            placeholder={t("form.subject")}
            className="w-full border-b border-border bg-transparent px-0 py-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-text-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            {...register("message")}
            rows={4}
            placeholder={t("form.message")}
            className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:border-text-primary transition-colors"
          />
          {errors.message && (
            <span className="text-xs text-error">{errors.message.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={modalState === "sending"}
          className="mt-4 flex items-center justify-center gap-2 self-end rounded-full border border-border px-8 py-3 text-sm text-text-secondary transition-all hover:border-text-primary hover:text-text-primary disabled:opacity-50"
        >
          <Send size={14} />
          {modalState === "sending" ? t("form.sending") : t("form.send")}
        </button>
      </form>

      {/* Success / Error modals */}
      <AnimatePresence>
        {(modalState === "sent" || modalState === "error") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-modal-backdrop backdrop-blur-sm"
            onClick={() => setModalState("idle")}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-4 w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-2xl"
            >
              <div className="mb-4 text-4xl">
                {modalState === "sent" ? "✓" : "✕"}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-text-primary">
                {modalState === "sent"
                  ? t("modal.sentTitle")
                  : t("modal.errorTitle")}
              </h3>
              <p className="mb-6 text-sm text-text-secondary">
                {modalState === "sent"
                  ? t("modal.sentDescription")
                  : t("modal.errorDescription")}
              </p>
              <button
                type="button"
                onClick={() => setModalState("idle")}
                className="rounded-full border border-border px-6 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {t("modal.close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
