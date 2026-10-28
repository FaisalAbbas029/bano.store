/**
 * Admin Authentication utilities for Bano’s.Store
 */

export const ADMIN_CREDENTIALS = {
  validUsernames: ['admin', 'admin@banos.store', 'dayanalam78@gmail.com'],
  validPasswords: ['Banos2026!', 'admin123']
};

export function validateAdminCredentials(username: string, password: string): { success: boolean; error?: string } {
  if (!username || !username.trim()) {
    return { success: false, error: 'Please enter your admin username or email.' };
  }

  if (!password || !password.trim()) {
    return { success: false, error: 'Please enter your administrator password.' };
  }

  const u = username.trim().toLowerCase();
  const isUserValid = ADMIN_CREDENTIALS.validUsernames.some(v => v.toLowerCase() === u);
  const isPassValid = ADMIN_CREDENTIALS.validPasswords.includes(password.trim());

  if (isUserValid && isPassValid) {
    return { success: true };
  }

  return {
    success: false,
    error: 'Invalid credentials. Please verify your username and password.'
  };
}

const AUTH_STORAGE_KEY = 'banos_admin_session';

export function checkAdminSession(): boolean {
  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    return session === 'true';
  } catch (e) {
    return false;
  }
}

export function saveAdminSession(remember = true): void {
  try {
    if (remember) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    }
  } catch (e) {
    // Ignore
  }
}

export function clearAdminSession(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    // Ignore
  }
}
