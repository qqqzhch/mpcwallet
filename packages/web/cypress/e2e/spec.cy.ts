describe('App First Test', () => {
  it('home page', () => {
    cy.visit('http://localhost:5173')
    cy.contains('My Multichain Wallet')
    cy.contains('Welcome to the Multichain - SMPC')
    cy.contains('Create new Wallet')
    cy.contains('Support Network')
    
  })
})