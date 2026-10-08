export function createLeadRateLimiter({ windowMs = 10 * 60 * 1000, maxAttempts = 5, maxKeys = 10_000 } = {}) {
  const attempts = new Map<string, number[]>();
  return {
    isLimited(ip: string, now = Date.now()) {
      // Opportunistic expiry: no persistent timers or unbounded idle IP records.
      for (const [key, timestamps] of attempts) {
        const recent = timestamps.filter((time) => now - time < windowMs);
        if (!recent.length) attempts.delete(key);
        else attempts.set(key, recent);
      }
      const recent = attempts.get(ip) ?? [];
      if (recent.length >= maxAttempts || (!attempts.has(ip) && attempts.size >= maxKeys)) return true;
      attempts.set(ip, [...recent, now]);
      return false;
    },
  };
}
