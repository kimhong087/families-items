"use client";

import Link from "next/link";
import { signup } from "./actions";
import AuthShell from "../../components/AuthShell";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useLanguage } from "../../lib/language-context";

export default function SignupPage({ searchParams }) {
  const { t } = useLanguage();
  const params = searchParams || {};
  const errorMessage = params.error;
  const checkEmail = params.check !== undefined;

  return (
    <AuthShell
      active="signup"
      title={t("auth.welcome")}
      subtitle={t("auth.subtitle")}
    >
      <form action={signup}>
        <FormField id="email" label={t("auth.email")} type="email" autoComplete="email" required placeholder={t("auth.emailPlaceholder")} />
        <FormField id="password" label={t("auth.password")} type="password" autoComplete="new-password" minLength={6} required placeholder={t("auth.passwordPlaceholder")} />

        {checkEmail && (
          <p className="notice notice-success" style={{ marginBottom: 16 }}>
            Account created — check your email to confirm it, then log in.
          </p>
        )}

        {errorMessage && (
          <p role="alert" className="notice notice-error" style={{ marginBottom: 16 }}>
            {errorMessage}
          </p>
        )}

        <SubmitButton pendingText={t("auth.pendingSignup")}>{t("auth.signupButton")}</SubmitButton>

        <p className="auth-hint">
          {t("auth.haveAccountHint")} <Link href="/login">{t("auth.loginLink")}</Link>
        </p>
      </form>
    </AuthShell>
  );
}
