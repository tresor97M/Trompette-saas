import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

/**
 * Hashes a password using PBKDF2/scrypt algorithm natively supported by Node.js.
 * Returns a string formatted as "salt:hash" in hexadecimal format.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Compares a plain password with a stored salt-hash pair.
 */
export function comparePassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const hash = scryptSync(password, salt, 64).toString('hex');
  return timingSafeEqual(
    new Uint8Array(Buffer.from(key, 'hex')),
    new Uint8Array(Buffer.from(hash, 'hex'))
  );
}
