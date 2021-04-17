/* globals cy */

describe('app', () => {
  describe('When user is not logged in', () => {
    it('can\'t login into the app without a name', () => {
      cy.visit('/');
      cy.findByTestId('login').click({ force: true });
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('logs in when name is provided', () => {
      cy.visit('/');
      cy.findByTestId('input').type('Lucas', { force: true });
      cy.findByTestId('login').click({ force: true });
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/app');
      });
    });
  });

  describe('When user is logged in', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.findByTestId('input').type('New Name', { force: true });
      cy.findByTestId('login').click();
    });

    it('can navigate between pages inside /app', () => {
      cy.get('svg').should('be.visible');
      cy.findByText('New Running Session').should('be.visible');
      cy.visit('/app/history');
      cy.findByText('Fri Mar 26 2021').should('be.visible');
      cy.visit('/app/progress');
      cy.findAllByText('Your Progress').should('be.visible');
      cy.visit('/app/more');
      cy.findAllByText('Logout').should('be.visible');
    });

    it('can logout', () => {
      cy.get('svg').should('be.visible');
      cy.findByText('New Running Session').should('be.visible');
      cy.visit('/app/more');
      cy.findAllByText('Logout').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('can go to New Running Session page', () => {
      cy.findByText('New Running Session').click({ force: true });
      cy.location((loc) => {
        expect(loc.pathname).to.eq('/run');
      });
    });

    it('can start a new Running Session', () => {
      cy.findByText('New Running Session').click({ force: true });
      cy.findByTestId('plusOneKm').click();
      cy.findByText('Start Running Session').click();
      cy.findByText('Finish').should('be.visible');
    });
  });
});
