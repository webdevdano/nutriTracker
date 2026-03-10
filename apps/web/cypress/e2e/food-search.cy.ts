/**
 * food-search.cy.ts — Food search flow E2E tests
 *
 * Covers: search form render, results appearing, food selection showing
 * detail panel, and adding a food to the daily log.
 *
 * All external API calls are intercepted.
 */

const TEST_EMAIL = "e2e-search@nutritracker.test";
const TEST_PASS = "E2eTest123!";

const SEARCH_STUB = {
  foods: [
    {
      fdcId: 748967,
      description: "Chicken Breast, cooked",
      brandName: null,
      servingSize: 100,
      servingSizeUnit: "g",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sodium: 74,
    },
    {
      fdcId: 748968,
      description: "Chicken Thigh, cooked",
      brandName: null,
      servingSize: 100,
      servingSizeUnit: "g",
      calories: 210,
      protein: 26,
      carbs: 0,
      fat: 11,
      fiber: 0,
      sodium: 90,
    },
  ],
};

const FOOD_DETAIL_STUB = {
  fdcId: 748967,
  description: "Chicken Breast, cooked",
  servingSize: 100,
  servingSizeUnit: "g",
  calories: 165,
  protein: 31,
  carbs: 0,
  fat: 3.6,
  fiber: 0,
  sodium: 74,
};

const ADD_LOG_STUB = {
  id: "log-abc123",
  food_name: "Chicken Breast, cooked",
  calories: 165,
};

describe("Food Search", () => {
  before(() => {
    cy.signupAndLogin(TEST_EMAIL, TEST_PASS);
  });

  beforeEach(() => {
    cy.login(TEST_EMAIL, TEST_PASS);
    cy.visit("/app/search");
  });

  it("renders the search form", () => {
    cy.contains(/search and add/i).should("be.visible");
    cy.get('input[placeholder*="food"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("shows food results after a search", () => {
    cy.intercept("GET", "/api/foods/search*", {
      statusCode: 200,
      body: SEARCH_STUB,
    }).as("search");

    cy.get('input[placeholder*="food"]').type("chicken");
    cy.get('button[type="submit"]').click();

    cy.wait("@search");

    cy.contains("Chicken Breast, cooked", { timeout: 8000 }).should(
      "be.visible",
    );
    cy.contains("Chicken Thigh, cooked").should("be.visible");
  });

  it("shows food detail when a result is clicked", () => {
    cy.intercept("GET", "/api/foods/search*", {
      statusCode: 200,
      body: SEARCH_STUB,
    });
    cy.intercept("GET", "/api/foods/748967", {
      statusCode: 200,
      body: FOOD_DETAIL_STUB,
    }).as("detail");

    cy.get('input[placeholder*="food"]').type("chicken");
    cy.get('button[type="submit"]').click();

    cy.contains("Chicken Breast, cooked", { timeout: 8000 }).click();

    // Detail panel / serving selector should appear
    cy.contains(/add to log/i, { timeout: 8000 }).should("be.visible");
  });

  it("adds a food to the daily log", () => {
    cy.intercept("GET", "/api/foods/search*", {
      statusCode: 200,
      body: SEARCH_STUB,
    });
    cy.intercept("GET", "/api/foods/748967", {
      statusCode: 200,
      body: FOOD_DETAIL_STUB,
    });
    cy.intercept("POST", "/api/food-logs", {
      statusCode: 201,
      body: { log: ADD_LOG_STUB },
    }).as("addLog");

    cy.get('input[placeholder*="food"]').type("chicken");
    cy.get('button[type="submit"]').click();
    cy.contains("Chicken Breast, cooked", { timeout: 8000 }).click();

    cy.contains(/add to log/i, { timeout: 8000 }).click();

    cy.wait("@addLog");

    // Success feedback — query input cleared or a toast/message
    cy.get('@addLog').its('request.body').should('include', { fdcId: 748967 });
  });

  it("shows an error when the search API fails", () => {
    cy.intercept("GET", "/api/foods/search*", {
      statusCode: 500,
      body: { error: "Search service unavailable" },
    }).as("searchFail");

    cy.get('input[placeholder*="food"]').type("chicken");
    cy.get('button[type="submit"]').click();

    cy.wait("@searchFail");

    cy.contains(/search failed|error|unavailable/i, {
      timeout: 8000,
    }).should("be.visible");
  });
});
