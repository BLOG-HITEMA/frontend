// https://docs.cypress.io/api/introduction/api.html

describe('Header', () => {

  it('test avec attribue demo-ref-last-h2', () => {
    cy.visit('/')
    cy.get('[data-test-h1="h1-accueil"]').should('have.text', 'Accueil')
    cy.get(' [data-test-connexion="connexion"]').click()
    cy.get('[data-test-h1="h1-login"]').should('have.text', 'Login')
  })
})
