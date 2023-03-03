import { MockProvider } from '@rsksmart/mock-web3-provider'
describe('App First Test', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D';
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'
  beforeEach(() => {
    cy.on("window:before:load", (win) => {
      win.ethereum = new MockProvider({
        address,
        privateKey,
        networkVersion: 5,
        debug: true
      })
    })

    cy.visit('http://localhost:5173')
    cy.contains('My Multichain Wallet')
    cy.contains('Welcome to the Multichain - SMPC')
    cy.contains('Create new Wallet')
    cy.contains('Support Network')

    cy.contains('Connect wallet').click()
    cy.contains('Connect with MetaMask').click()
    cy.contains('metamask')
    cy.contains('Görli')
    
  })

  it('Create new Wallet', () => {
    cy.contains('Create new Wallet').click()
    
    

    
    
  })
})