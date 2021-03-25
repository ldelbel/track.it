/* globals cy */

describe('app', () => {
    it('can login into the app', () => {
        cy.visit('/');
        cy.findByTestId('login').click();
    })
})