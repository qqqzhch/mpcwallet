import { MyMockProvider } from './MockProvider'
describe('createNewWallet', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D';
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'
  beforeEach(() => {
    cy.on("window:before:load", (win) => {
      win.ethereum = new MyMockProvider({ address, privateKey, networkVersion: 5, debug:false })
      win.ethereum.enable= async function () {
       return  [address]
      }
      

      
    })
  })

  it('use metamask login', () => {
    cy.visit('http://localhost:5173')
    cy.contains('My MPC Wallet')
    cy.contains('Welcome to the Multichain - SMPC')
    
    

    cy.contains('Connect wallet').click()
    cy.contains('Connect with MetaMask').click()
    cy.contains('metamask')
    cy.contains('Görli')
    cy.contains('Create new Wallet').click()
    cy.contains('EC256K1').click()
    cy.get('input[name="walletname1"]')
    .type('0x68D25464371F3a97691c52e40d4C1306aF0B7629')
    cy.get("button").contains("Next").click()
    cy.contains('Review')
    cy.contains('0x68D25464371F3a97691c52e40d4C1306aF0B7629')
    cy.get("button").contains("Next").click()
    cy.contains('Your wallet has been created successfully')
    cy.contains('pending...')
    cy.wait(1000*10) 
    cy.not("pending...")  



    
    

    
    
  })
})