import apiClient from "./api.js";
import { CURRENT_USER, DEMO_ADMIN_USER } from "../data/mockUsers.js";

/**
 * SECURITY NOTICE:
 * This module provides an explicitly configured DEMONSTRATION authentication mock
 * for local Phase 1 UI prototyping only. It does NOT provide cryptographic authentication,
 * password hashing, or production security boundaries. Real security requires a FastAPI
 * backend with Bcrypt/Argon2 password verification and signed HttpOnly JWT cookies.
 */

const STORAGE_KEY_USER = "stylecycle_user";
const STORAGE_KEY_SESSION = "stylecycle_demo_session";

export const authService = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("[STYLECYCLE DEMO AUTH] Error reading demo session", e);
    }
    // Return null when unauthenticated to enforce genuine route guard behavior
    return null;
  },

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }

    const cleanEmail = email.trim().toLowerCase();

    // Dedicated demonstration admin credentials for local UI testing only.
    // REMOVED INSECURE EMAIL SUBSTRING ASSIGNMENT (SEC-VULN-002).
    // Administrative privileges are NEVER assigned based on arbitrary email addresses.
    let user;
    if (cleanEmail === "admin@stylecycle.demo" && password === "adminDemo123!") {
      user = {
        ...DEMO_ADMIN_USER,
        isMockDemoAdmin: true,
        authMethod: "MOCK_LOCAL_ADMIN_DEMO"
      };
      console.info("[STYLECYCLE DEMO AUTH] Signed in as dedicated Demo Administrator.");
    } else {
      // All other logins are strictly standard users.
      // Roles can never be self-assigned or derived from email patterns.
      user = {
        ...CURRENT_USER,
        id: `usr-${Date.now()}`,
        email: cleanEmail,
        name: cleanEmail.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
        role: "user", // ALWAYS enforce 'user' role
        isMockDemoAdmin: false,
        authMethod: "MOCK_LOCAL_USER_DEMO"
      };
    }

    // Store non-sensitive profile state (passwords are NEVER stored in localStorage)
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    
    // Store transparent demonstration session metadata (NOT a real cryptographic JWT)
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({
      isDemoSession: true,
      issuedAt: new Date().toISOString(),
      disclaimer: "Mock session for local UI demonstration only - Not production auth"
    }));

    return user;
  },

  async loginDemoAdmin() {
    return this.login({
      email: "admin@stylecycle.demo",
      password: "adminDemo123!"
    });
  },

  async loginDemoUser() {
    return this.login({
      email: "tara.style@example.com",
      password: "password123"
    });
  },

  async register({ fullName, email, phone, password }) {
    if (!fullName || !email || !password) {
      throw new Error("Full name, email, and password are required.");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    const cleanEmail = email.trim().toLowerCase();

    // Client registration NEVER permits role specification.
    // Every registered account is strictly assigned role: "user".
    const newUser = {
      ...CURRENT_USER,
      id: `usr-${Date.now()}`,
      name: fullName.trim(),
      email: cleanEmail,
      phone: phone?.trim() || "+91 99999 88888",
      role: "user", // STRICTLY ENFORCED: Client cannot create admin accounts
      isMockDemoAdmin: false,
      memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      authMethod: "MOCK_LOCAL_USER_DEMO"
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({
      isDemoSession: true,
      issuedAt: new Date().toISOString(),
      disclaimer: "Mock session for local UI demonstration only - Not production auth"
    }));

    return newUser;
  },

  async updateProfile(updatedData) {
    const current = this.getCurrentUser();
    // Prevent client-side role manipulation via profile update
    const { role, isMockDemoAdmin, ...safeData } = updatedData;
    const updated = { ...current, ...safeData };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    return updated;
  },

  logout() {
    // Clear current user and session identifiers cleanly
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_SESSION);
    // Remove legacy mock token if present
    localStorage.removeItem("stylecycle_token");
  }
};
