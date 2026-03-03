"use client";

import { UserRound, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./theme-toggle";

export default function HeaderTools() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className="header-actions">
        <ThemeToggle />
        <button
          type="button"
          className="user-toggle"
          aria-label="Abrir login"
          onClick={() => setIsLoginOpen(true)}
        >
          <UserRound size={16} aria-hidden />
        </button>
      </div>

      {isLoginOpen && (
        <div className="login-modal-root" role="dialog" aria-modal="true" aria-label="Login">
          <button
            type="button"
            aria-label="Cerrar modal de login"
            className="login-modal-backdrop"
            onClick={() => setIsLoginOpen(false)}
          />
          <div className="login-modal-card">
            <div className="login-modal-head">
              <h3>Login</h3>
              <button
                type="button"
                className="login-modal-close"
                aria-label="Cerrar login"
                onClick={() => setIsLoginOpen(false)}
              >
                <X size={15} aria-hidden />
              </button>
            </div>
            <form className="login-form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="login-email">
                Email
                <input id="login-email" name="email" type="email" placeholder="tu@email.com" />
              </label>
              <label htmlFor="login-password">
                Password
                <input id="login-password" name="password" type="password" placeholder="********" />
              </label>
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
