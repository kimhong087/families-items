"use client";

import { useFormStatus } from "react-dom";
import "./auth-submit.css";

// Submit button shared by the login and signup forms. While the form's
// server action is in flight it shows a small spinner, swaps its label,
// and disables itself — so a slow Supabase round trip can't be clicked
// twice and the user gets immediate feedback.
export default function SubmitButton({ children, pendingText, style }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="auth-submit"
      style={style}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? (
        <span className="auth-submit-label">
          <span className="auth-spinner" aria-hidden="true" />
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}