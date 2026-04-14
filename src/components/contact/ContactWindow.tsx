"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailX } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/application/validation/contactSchema";

type ModalView = "form" | "sent" | "error";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactWindow({ isOpen, onClose }: Props) {
  const t = useTranslations("contact");
  const [view, setView] = useState<ModalView>("form");
  const [sending, setSending] = useState(false);

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
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setView("sent");
        reset();
      } else {
        setView("error");
      }
    } catch {
      setView("error");
    } finally {
      setSending(false);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => setView("form"), 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[calc(100%-32px)] max-w-[860px] -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {view === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden rounded-xl bg-[#1a1a1a] shadow-2xl"
                >
                  {/* macOS title bar */}
                  <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
                    <button type="button" onClick={handleClose} className="size-[12px] rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80" aria-label="Close" />
                    <span className="size-[12px] rounded-full bg-[#febc2e]" />
                    <span className="size-[12px] rounded-full bg-[#28c840]" />
                    <span className="ml-auto text-[13px] font-medium text-text-primary">
                      New message
                    </span>
                    <span className="ml-auto w-[60px]" />
                  </div>

                  {/* Form body */}
                  <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    {/* Honeypot */}
                    <input
                      type="text"
                      {...register("honeypot")}
                      className="absolute -left-[9999px] opacity-0"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Email field */}
                    <div className="flex items-center border-b border-white/10 py-3">
                      <label className="w-[70px] text-[13px] font-medium text-text-secondary">
                        Email:
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-tertiary/50"
                      />
                    </div>
                    {errors.email && (
                      <span className="mt-1 block text-[11px] text-error">{errors.email.message}</span>
                    )}

                    {/* Name field */}
                    <div className="flex items-center border-b border-white/10 py-3">
                      <label className="w-[70px] text-[13px] font-medium text-text-secondary">
                        Name:
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Enter your name"
                        className="flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-tertiary/50"
                      />
                    </div>
                    {errors.name && (
                      <span className="mt-1 block text-[11px] text-error">{errors.name.message}</span>
                    )}

                    {/* Subject field */}
                    <div className="flex items-center border-b border-white/10 py-3">
                      <label className="w-[70px] text-[13px] font-medium text-text-secondary">
                        Subject:
                      </label>
                      <input
                        {...register("subject")}
                        placeholder="Any subject..."
                        className="flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-tertiary/50"
                      />
                    </div>

                    {/* Message textarea */}
                    <div className="mt-4">
                      <textarea
                        {...register("message")}
                        rows={8}
                        placeholder="Write your message here"
                        className="w-full resize-none rounded-lg border border-white/10 bg-[#111] p-4 text-[13px] text-text-primary outline-none placeholder:text-text-tertiary/50 focus:border-white/20"
                      />
                      {errors.message && (
                        <span className="mt-1 block text-[11px] text-error">{errors.message.message}</span>
                      )}
                    </div>

                    {/* Send button */}
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={sending}
                        className="rounded-lg bg-white/10 px-6 py-2.5 text-[13px] font-medium text-text-primary transition-colors hover:bg-white/15 disabled:opacity-50"
                      >
                        {sending ? t("form.sending") : "Send"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {view === "sent" && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[450px] flex-col items-center justify-center rounded-xl bg-[#1a1a1a] px-8 py-16 shadow-2xl"
                >
                  <Mail size={40} strokeWidth={1.5} className="mb-6 text-text-primary" />
                  <h3 className="mb-3 text-2xl font-bold text-text-primary">
                    Message Sent!
                  </h3>
                  <p className="mb-12 max-w-sm text-center text-[14px] leading-relaxed text-text-secondary">
                    Thank you for taking the time to write to me.
                    <br />I will get back to you as soon as possible.
                  </p>
                  <p className="mt-auto text-[13px] text-text-tertiary">
                    At the same time, find me on my social networks
                  </p>
                </motion.div>
              )}

              {view === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[450px] flex-col items-center justify-center rounded-xl bg-[#1a1a1a] px-8 py-16 shadow-2xl"
                >
                  <MailX size={40} strokeWidth={1.5} className="mb-6 text-error" />
                  <h3 className="mb-3 text-2xl font-bold text-text-primary">
                    Message not send :(
                  </h3>
                  <p className="mb-12 max-w-md text-center text-[14px] leading-relaxed text-text-secondary">
                    An error occurred while sending your message. Please try again later.
                    <br />Or, try contacting me using another method.
                  </p>
                  <p className="mt-auto text-[13px] text-text-tertiary">
                    At the same time, find me on my social networks
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
