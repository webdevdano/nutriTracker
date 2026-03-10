/**
 * API base URL for the NutriTracker backend (Next.js).
 *
 * Dev:  set EXPO_PUBLIC_API_URL=http://YOUR_LAN_IP:3000 in apps/mobile/.env
 *       (find your IP: `ipconfig getifaddr en0` on Mac)
 * Prod: set EXPO_PUBLIC_API_URL=https://your-deployed-domain.com
 */
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const apiUrl = (path: string) => `${API_URL}${path}`;
