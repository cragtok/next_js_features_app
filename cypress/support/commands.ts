/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.getBySel('greeting')
     */
    getBySel(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select DOM element by data-test attribute that contains the given string.
     * @example cy.getBySelLike('greeting')
     */
    getBySelLike(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to find DOM element by data-test attribute as a child command.
     * @example cy.get('.parent').findChildBySel('greeting')
     */
    findChildBySel(selector: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select an input element by its name attribute.
     * @example cy.getByInputName('username')
     */
    getByInputName(name: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
})

Cypress.Commands.add('findChildBySel', { prevSubject: 'element' }, (subject, selector, ...args) => {
  return cy.wrap(subject).find(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getByInputName', (name, ...args) => {
  return cy.get(`input[name="${name}"]`, ...args);
});