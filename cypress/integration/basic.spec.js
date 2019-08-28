/// <reference types="Cypress" />

context('Basic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/out-small.html');
  });
  it('renders the page', () => {
    cy.get('svg').should('have.length', 1);
    cy.get('circle').should('have.length', 11);
    cy.get('line').should('have.length', 15);
  });
});
