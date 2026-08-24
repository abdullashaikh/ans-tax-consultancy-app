/**
 * Reusable validation utilities for ANS Tax Consultancy Client Portal & Forms
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface PasswordStrength {
  isValid: boolean;
  score: number; // 0 to 4
  error?: string;
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

/**
 * Validates standard RFC 5322 compliant email format
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. name@company.com).' };
  }

  return { isValid: true };
}

/**
 * Evaluates password strength and strict security requirements
 */
export function validatePassword(password: string, isRegistration = false): PasswordStrength {
  const raw = password || '';

  const checks = {
    minLength: raw.length >= 8,
    hasUppercase: /[A-Z]/.test(raw),
    hasLowercase: /[a-z]/.test(raw),
    hasNumber: /[0-9]/.test(raw),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(raw),
  };

  let score = 0;
  if (checks.minLength) score++;
  if (checks.hasUppercase && checks.hasLowercase) score++;
  if (checks.hasNumber) score++;
  if (checks.hasSpecial) score++;

  if (!raw) {
    return {
      isValid: false,
      score: 0,
      error: 'Password is required.',
      checks,
    };
  }

  if (isRegistration) {
    if (!checks.minLength) {
      return { isValid: false, score, error: 'Password must contain at least 8 characters.', checks };
    }
    if (!checks.hasUppercase) {
      return { isValid: false, score, error: 'Password must include at least one uppercase letter (A-Z).', checks };
    }
    if (!checks.hasLowercase) {
      return { isValid: false, score, error: 'Password must include at least one lowercase letter (a-z).', checks };
    }
    if (!checks.hasNumber) {
      return { isValid: false, score, error: 'Password must include at least one number (0-9).', checks };
    }
    if (!checks.hasSpecial) {
      return { isValid: false, score, error: 'Password must include at least one special character (!@#$%...).', checks };
    }
  } else {
    if (!checks.minLength) {
      return { isValid: false, score, error: 'Password must be at least 8 characters.', checks };
    }
  }

  return {
    isValid: true,
    score,
    checks,
  };
}

/**
 * Validates Indian Phone Numbers (10 digits with optional +91 or leading 0)
 */
export function validatePhone(phone: string): ValidationResult {
  const trimmed = (phone || '').trim().replace(/[\s-]/g, '');
  if (!trimmed) {
    return { isValid: false, error: 'Phone number is required.' };
  }

  const phoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  if (!phoneRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210).' };
  }

  return { isValid: true };
}

/**
 * Validates Indian PAN Format (5 letters, 4 digits, 1 letter)
 */
export function validatePAN(pan: string): ValidationResult {
  const trimmed = (pan || '').trim().toUpperCase();
  if (!trimmed) return { isValid: true }; // Optional field

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid PAN format. Must be 10 characters (e.g. ABCDE1234F).' };
  }

  return { isValid: true };
}

/**
 * Validates Indian GSTIN Format (15 alphanumeric characters)
 */
export function validateGSTIN(gstin: string): ValidationResult {
  const trimmed = (gstin || '').trim().toUpperCase();
  if (!trimmed) return { isValid: true }; // Optional field

  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstinRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid GSTIN format. Must be 15 characters (e.g. 24AAAAA0000A1Z5).' };
  }

  return { isValid: true };
}
