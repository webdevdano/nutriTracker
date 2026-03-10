/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      signupAndLogin(email: string, password: string, name?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("/login");
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 12000 }).should("include", "/app");
    },
    { cacheAcrossSpecs: true },
  );
});

Cypress.Commands.add(
  "signupAndLogin",
  (email: string, password: string, name = "E2E User") => {
    cy.request({
      method: "POST",
      url: "/api/auth/register",
      body: { email, password, name },
      failOnStatusCode: false,
    });
    cy.login(email, password);
  },
);

export {};
