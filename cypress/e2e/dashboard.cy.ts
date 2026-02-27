/**
 * dashboard.cy.ts — Dashboard page E2E tests
 *
 * Covers: unauthenticated redirect, page render with stubbed GraphQL,
 * time-view toggle, and empty-state message when no meals are logged.
 *
 * GraphQL (/api/graphql) and RTK Query (/api/food-logs) calls are intercepted
 * so tests are deterministic and offline-safe.
 */

const TEST_EMAIL = "e2e-dashboard@nutritracker.test";
const TEST_PASS = "E2eTest123!";

// Minimal GraphQL dashboard response
const GRAPHQL_STUB = {
  data: {
    dashboard: {
      logs: [],
      summary: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sodium: 0,
      },
      goals: {
        caloriesGoal: 2000,
        proteinGoal: 150,
        carbsGoal: 250,
        fatGoal: 65,
      },
      profile: {
        fullName: "E2E Dash User",
        fitnessGoal: "maintain",
      },
    },
  },
};

const GRAPHQL_WITH_LOGS = {
  data: {
    dashboard: {
      logs: [
        {
          id: "log-1",
          fdcId: 748967,
          foodName: "Chicken Breast",
          calories: "165",
          protein: "31",
          carbs: "0",
          fat: "3.6",
          fiber: "0",
          sodium: "74",
          date: new Date().toISOString().split("T")[0],
          quantity: "1",
        },
      ],
      summary: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sodium: 74 },
      goals: { caloriesGoal: 2000, proteinGoal: 150, carbsGoal: 250, fatGoal: 65 },
      profile: { fullName: "E2E Dash User", fitnessGoal: "maintain" },
    },
  },
};

describe("Dashboard", () => {
  before(() => {
    cy.signupAndLogin(TEST_EMAIL, TEST_PASS);
  });

  // ── Redirect guard ────────────────────────────────────────────────────────

  it("redirects unauthenticated users to /login", () => {
    cy.clearCookies();
    cy.visit("/app");
    cy.url({ timeout: 8000 }).should("include", "/login");
  });

  // ── Core render ───────────────────────────────────────────────────────────

  describe("when authenticated", () => {
    beforeEach(() => {
      cy.login(TEST_EMAIL, TEST_PASS);

      cy.intercept("POST", "/api/graphql", (req) => {
        req.reply({ statusCode: 200, body: GRAPHQL_STUB });
      }).as("graphql");

      cy.intercept("GET", "/api/food-logs*", {
        statusCode: 200,
        body: { logs: [] },
      }).as("foodLogs");

      cy.visit("/app");
    });

    it("renders the Progress heading and date", () => {
      cy.contains("h1", /progress/i, { timeout: 10000 }).should("be.visible");
      // Should show current day of week
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      cy.contains(today).should("be.visible");
    });

    it("renders the Today / 7 Days / 30 Days toggle", () => {
      cy.contains("button", "Today").should("be.visible");
      cy.contains("button", "7 Days").should("be.visible");
      cy.contains("button", "30 Days").should("be.visible");
    });

    it("shows Today's Meals section", () => {
      cy.contains(/today.?s meals/i, { timeout: 10000 }).should("be.visible");
    });

    it("shows empty-state message when no meals are logged", () => {
      cy.contains(/no meals logged yet today/i, { timeout: 10000 }).should(
        "be.visible",
      );
    });

    it("switches to 7-day view when 7 Days button is clicked", () => {
      cy.intercept("GET", "/api/food-logs*", {
        statusCode: 200,
        body: { logs: [] },
      });

      cy.contains("button", "7 Days").click();

      // The active button should have data-active="true"
      cy.contains("button", "7 Days").should("have.attr", "data-active", "true");
    });
  });

  // ── With meals ────────────────────────────────────────────────────────────

  describe("when meals are logged", () => {
    beforeEach(() => {
      cy.login(TEST_EMAIL, TEST_PASS);

      cy.intercept("POST", "/api/graphql", (req) => {
        req.reply({ statusCode: 200, body: GRAPHQL_WITH_LOGS });
      }).as("graphqlWithLogs");

      cy.intercept("GET", "/api/food-logs*", {
        statusCode: 200,
        body: { logs: GRAPHQL_WITH_LOGS.data.dashboard.logs },
      });

      cy.visit("/app");
    });

    it("shows logged food items", () => {
      cy.contains("Chicken Breast", { timeout: 10000 }).should("be.visible");
    });

    it("shows calorie numbers from the logged food", () => {
      cy.contains("165", { timeout: 10000 }).should("be.visible");
    });
  });
});
