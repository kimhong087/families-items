"use client";

import Link from "next/link";
import { login } from "./actions";
import AuthShell from "../../components/AuthShell";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useLanguage } from "../../lib/language-context";

export default function LoginPage({ searchParams }) {
  const { t } = useLanguage();
  const params = searchParams || {};
  const failed = params.error !== undefined;

  return (
    <AuthShell
      active="login"
      title={t("auth.welcome")}
      subtitle={t("auth.subtitle")}
    >
      <form action={login}>
        <FormField id="email" label={t("auth.email")} type="email" autoComplete="email" required placeholder={t("auth.emailPlaceholder")} />
        <FormField id="password" label={t("auth.password")} type="password" autoComplete="current-password" required placeholder={t("auth.passwordPlaceholder")} />

        {failed && (
          <p role="alert" className="notice notice-error" style={{ marginBottom: 16 }}>
            {t("auth.invalidCredentials")}
          </p>
        )}

        <SubmitButton pendingText={t("auth.pendingLogin")}>{t("auth.loginButton")}</SubmitButton>

        <p className="auth-hint">
          {t("auth.createAccountHint")} <Link href="/signup">{t("auth.signupLink")}</Link>
        </p>
      </form>
    </AuthShell>
  );
}
