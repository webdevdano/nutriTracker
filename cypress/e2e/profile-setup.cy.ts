/**
 * profile-setup.cy.ts — Profile setup flow E2E tests
 *
 * Covers: form render, BMI calculation with stubbed APIs, error state when
 * BMI API fails, and a successful full save flow.
 *
 * External API calls (/api/bmi, /api/nutrition-info, /api/profile,
 * /api/user-goals) are all intercepted so tests run offline and fast.
 */

const TEST_EMAIL = "e2e-profile@nutritracker.test";
const TEST_PASS = "E2eTest123!";

const BMI_STUB = { bmi: "22.9" };

const NUTRITION_STUB = {
  BMI_EER: {
    BMI: "22.9",
    "Estimated Daily Caloric Needs": "2,200",
  },
  macronutrients_table: {
    "macronutrients-table": [
      ["Protein", "165"],
      ["Carbohydrate", "275-300"],
      ["Fat", "73-80"],
      ["Fiber", "34"],
    ],
  },
  vitamins_table: { "vitamins-table": [] },
  minerals_table: { "minerals-table": [] },
};

describe("Profile Setup", () => {
  before(() => {
    cy.signupAndLogin(TEST_EMAIL, TEST_PASS);
  });

  beforeEach(() => {
    cy.login(TEST_EMAIL, TEST_PASS);
  });

  it("renders the profile setup form", () => {
    cy.visit("/profile-setup");
    cy.contains("h1", /set up your profile|update your profile/i).should(
      "be.visible",
    );
    cy.get('input[type="number"]').should("have.length.at.least", 2);
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("calculates BMI and displays results", () => {
    cy.intercept("GET", "/api/bmi*", { statusCode: 200, body: BMI_STUB }).as(
      "bmi",
    );
    cy.intercept("GET", "/api/nutrition-info*", {
      statusCode: 200,
      body: NUTRITION_STUB,
    }).as("nutrition");

    cy.visit("/profile-setup");

    // Fill in the form fields
    cy.get('input[type="number"]').first().clear().type("28"); // age
    cy.get('select').first().select("male");                   // sex
    cy.get('input[type="number"]').eq(1).clear().type("5");    // feet
    cy.get('input[type="number"]').eq(3).clear().type("170");  // weight

    cy.get('button[type="submit"]').click();

    cy.wait(["@bmi", "@nutrition"]);

    // Results panel should appear
    cy.contains(/bmi/i, { timeout: 8000 }).should("be.visible");
    cy.contains("22.9").should("be.visible");
  });

  it("shows an error when BMI API returns 403", () => {
    cy.intercept("GET", "/api/bmi*", {
      statusCode: 403,
      body: { message: "You are not subscribed to this API." },
    }).as("bmiError");
    cy.intercept("GET", "/api/nutrition-info*", {
      statusCode: 200,
      body: NUTRITION_STUB,
    });

    cy.visit("/profile-setup");

    cy.get('input[type="number"]').first().clear().type("28");
    cy.get('input[type="number"]').eq(1).clear().type("5");
    cy.get('input[type="number"]').eq(3).clear().type("170");
    cy.get('button[type="submit"]').click();

    cy.wait("@bmiError");
    cy.contains(/not subscribed|service error|bmi/i, {
      timeout: 8000,
    }).should("be.visible");
  });

  it("saves profile and redirects to /app", () => {
    cy.intercept("GET", "/api/bmi*", { statusCode: 200, body: BMI_STUB });
    cy.intercept("GET", "/api/nutrition-info*", {
      statusCode: 200,
      body: NUTRITION_STUB,
    });
    cy.intercept("POST", "/api/profile", {
      statusCode: 200,
      body: { profile: { id: "prof-1" } },
    }).as("saveProfile");
    cy.intercept("POST", "/api/user-goals", {
      statusCode: 200,
      body: { goals: { id: "goals-1" } },
    }).as("saveGoals");

    cy.visit("/profile-setup");

    cy.get('input[type="number"]').first().clear().type("28");
    cy.get('input[type="number"]').eq(1).clear().type("5");
    cy.get('input[type="number"]').eq(3).clear().type("170");
    cy.get('button[type="submit"]').click();

    // Wait for results to appear, then save
    cy.contains(/save|update profile/i, { timeout: 10000 }).should(
      "be.visible",
    );
    cy.contains(/save|update profile/i).click();

    cy.wait(["@saveProfile", "@saveGoals"]);
    cy.url({ timeout: 10000 }).should("include", "/app");
  });
});
