// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { injected } from './ethereum'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
      interface ApplicationWindow {
        ethereum: typeof injected
      }
    }
  }

  // Cypress.Commands.overwrite(
  //   'visit',
  //   (original, url: string | Partial<Cypress.VisitOptions>, options?: Partial<Cypress.VisitOptions>) => {
  //     assert(typeof url === 'string')
      
  //     original({
  //       ...options,
  //       url: url.toString(),
  //       onBeforeLoad(win) {
  //         console.log('win.ethereum')
  //         options?.onBeforeLoad?.(win)
  //         win.ethereum = injected
  //       },
  //     })
  //   }
  // )