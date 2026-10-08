import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { createLeadRateLimiter } from "../src/lib/lead-rate-limit.ts";

test("five requests allowed, next blocked, window expiry releases the IP", () => {
  const limiter = createLeadRateLimiter({ windowMs: 100, maxAttempts: 5 });
  for (let i = 0; i < 5; i++) assert.equal(limiter.isLimited("a", i), false);
  assert.equal(limiter.isLimited("a", 6), true);
  assert.equal(limiter.isLimited("b", 6), false);
  assert.equal(limiter.isLimited("a", 104), false);
});

test("capacity rejects new keys without resetting an active IP; expired keys free capacity", () => {
  const limiter = createLeadRateLimiter({ windowMs: 100, maxAttempts: 2, maxKeys: 2 });
  assert.equal(limiter.isLimited("a", 1), false);
  assert.equal(limiter.isLimited("b", 2), false);
  assert.equal(limiter.isLimited("c", 3), true);
  assert.equal(limiter.isLimited("a", 4), false);
  assert.equal(limiter.isLimited("a", 5), true);
  assert.equal(limiter.isLimited("c", 105), false);
});

function publicationCheck(variables) {
  const env = { ...process.env, VERCEL_ENV: "production" };
  for (const key of Object.keys(env)) if (key.startsWith("NEXT_PUBLIC_LEGAL_") || key === "LEGAL_PUBLICATION_REVIEWED") delete env[key];
  return spawnSync(process.execPath, ["--input-type=module", "-e", 'import { assertLegalPublicationReady, legalIdentity } from "./src/lib/legal-identity.ts"; assertLegalPublicationReady(); console.log(JSON.stringify(legalIdentity));'], { cwd: process.cwd(), env: { ...env, ...variables }, encoding: "utf8" });
}

const confirmedIdentity = {
  NEXT_PUBLIC_LEGAL_BUSINESS_NAME: "Test supplier",
  NEXT_PUBLIC_LEGAL_BUSINESS_ADDRESS: "Test address",
  NEXT_PUBLIC_LEGAL_CONTACT_EMAIL: "test@example.com",
};

test("production requires name/address/email and review, without a public business number", () => {
  assert.notEqual(publicationCheck({}).status, 0);
  assert.notEqual(publicationCheck({ ...confirmedIdentity, NEXT_PUBLIC_LEGAL_CONTACT_EMAIL: "invalid", LEGAL_PUBLICATION_REVIEWED: "true" }).status, 0);
  const unreviewed = publicationCheck(confirmedIdentity);
  assert.notEqual(unreviewed.status, 0);
  assert.match(unreviewed.stderr, /requires review/);
  assert.equal(publicationCheck({ ...confirmedIdentity, LEGAL_PUBLICATION_REVIEWED: "true" }).status, 0);
  const legacyNumber = publicationCheck({ ...confirmedIdentity, NEXT_PUBLIC_LEGAL_BUSINESS_NUMBER: "not-for-public-copy", LEGAL_PUBLICATION_REVIEWED: "true" });
  assert.equal(legacyNumber.status, 0);
  assert.equal(Object.hasOwn(JSON.parse(legacyNumber.stdout), "number"), false);
  assert.doesNotMatch(legacyNumber.stdout, /not-for-public-copy/);
  assert.equal(publicationCheck({ VERCEL_ENV: "preview" }).status, 0);
});
