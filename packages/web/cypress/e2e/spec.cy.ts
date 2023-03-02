describe('App First Test', () => {
  it('home page', () => {
    cy.visit('http://localhost:5173')
    cy.contains('My Multichain Wallet')
    cy.contains('Welcome to the Multichain - SMPC')
    cy.contains('Create new Wallet')
    cy.contains('Support Network')

    cy.contains('Connect wallet').click()
    cy.contains('Connect with MetaMask').click()
    cy.contains('metamask')
    cy.contains('Görli')
    cy.contains('Create new Wallet').click()
    cy.contains('Login account')
    cy.contains('Set the node')
    cy.get('.e2eloginselect').find("button").click()
    cy.get('ul>li:nth-child(2)').click()
    cy.get('button').contains('Login').click();
    

    
    
  })
})