// E2E support file — loaded before every spec in cypress/e2e/
import "./commands";

/**
 * Ignore uncaught exceptions that are known Next.js / React noise.
 * Returning false prevents Cypress from failing the test on these errors.
 */
Cypress.on("uncaught:exception", (err) => {
  // React 18 hydration mismatch — server/client HTML differs. Does not
  // affect E2E assertions so we suppress it.
  if (err.message.includes("Hydration")) return false;
  if (err.message.includes("hydration")) return false;
  // Next.js router cancel during navigation
  if (err.message.includes("Route Cancelled")) return false;
  if (err.message.includes("NEXT_REDIRECT")) return false;
  // Let all other real errors fail the test
  return true;
});
