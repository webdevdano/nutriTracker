/**
 * auth.cy.ts — Authentication flow E2E tests
 *
 * Covers: login page render, invalid credentials, successful login,
 * signup page render, duplicate-email guard.
 */

const TEST_EMAIL = "e2e-auth@nutritracker.test";
const TEST_PASS = "E2eTest123!";

describe("Authentication", () => {
  // Ensure the test user exists before any spec in this file runs
  before(() => {
    cy.request({
      method: "POST",
      url: "/api/auth/register",
      body: { email: TEST_EMAIL, password: TEST_PASS, name: "E2E Auth User" },
      failOnStatusCode: false, // 409 is expected on repeated runs
    });
  });

  // ── Login page ────────────────────────────────────────────────────────────

  describe("Login page", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("renders the login form", () => {
      cy.contains("h1", /log in/i).should("be.visible");
      cy.get('input[type="email"]').should("be.visible");
      cy.get('input[type="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("shows a link to the signup page", () => {
      cy.get('a[href="/signup"]').should("exist");
    });

    it("shows an error on invalid credentials", () => {
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type("WrongPassword!");
      cy.get('button[type="submit"]').click();
      cy.contains(/invalid email or password/i, { timeout: 8000 }).should(
        "be.visible",
      );
    });

    it("redirects to /app after successful login", () => {
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type(TEST_PASS);
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 12000 }).should("include", "/app");
    });
  });

  // ── Signup page ───────────────────────────────────────────────────────────

  describe("Signup page", () => {
    beforeEach(() => {
      cy.visit("/signup");
    });

    it("renders the signup form", () => {
      cy.contains("h1", /sign up/i).should("be.visible");
      cy.get('input[type="email"]').should("be.visible");
      cy.get('input[type="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("shows a duplicate-email error when registering an existing address", () => {
      cy.get('input[placeholder="Full name"], input[name="fullName"]')
        .first()
        .type("Duplicate Test");
      cy.get('input[type="email"]').type(TEST_EMAIL);
      cy.get('input[type="password"]').type(TEST_PASS);
      cy.get('button[type="submit"]').click();
      cy.contains(
        /already exists|duplicate|account with that email/i,
        { timeout: 8000 },
      ).should("be.visible");
    });
  });

  // ── Protected routes ──────────────────────────────────────────────────────

  describe("Protected routes", () => {
    it("redirects unauthenticated users from /app to /login", () => {
      cy.clearCookies();
      cy.visit("/app");
      cy.url({ timeout: 8000 }).should("include", "/login");
    });
  });
});
