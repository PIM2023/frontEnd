require('cypress-iframe');

describe('Create and edit user', () => {
  /*
  it('Create user', () => {
    cy.visit('https://clout-pin.web.app/register');
    cy.get('#ion-input-0').type('Edwin');
    cy.get('#ion-input-1').type('Makoveev Routskaia');
    cy.get('#ion-input-2').type('175');
    cy.get('#ion-input-3').type('2002-10-28');
    cy.get('#ion-input-4').type('68');
    cy.get('#ion-input-5').type('edwin@gmail.com');
    cy.get('#ion-input-6').type('edwin123');
    cy.get('#ion-input-7').type('Edwin123.');
    cy.get('#condition').click();

    cy.wait(1000);
    cy.get('#ion-overlay-2').contains('Acepto').click();
    cy.wait(1000);

    cy.get('ion-button').contains('Registrarme').click();
    cy.wait(5000);

    cy.url().should('eq', 'https://clout-pin.web.app/login');
  });
*/
  it('Edit user', () => {
    cy.visit('https://clout-pin.web.app/login');
    cy.get('#ion-input-0').type('yoy75@upv.es');
    cy.get('#ion-input-1').type('password');

    cy.wait(2000);
    cy.get('ion-button').first().click();
    cy.get('ion-button').first().click();
    cy.wait(2500);

    cy.get('#tab-button-profile').click();
    cy.wait(2000);

    let username = 'Eeedwin';
    cy.get('.user-firstname')
      .invoke('text')
      .then((username2) => {
        if (username2.includes(username)) {
          username = 'Edwin';
        }

        cy.get('ion-button').contains('Editar Perfil').click();
        cy.wait(1000);

        cy.get('#ion-input-2').type('edwin123');
        cy.get('#ion-input-3').type('edwin@gmail.com');
        cy.get('#ion-input-4').type(username);

        cy.get('#ion-input-5').type('Makoveev Routskaia');
        cy.get('#ion-input-8').type('2002-10-28');
        cy.get('#ion-input-9').type('Edwin123.');

        cy.get('ion-button').contains('Guardar').click();
        cy.wait(1000);

        cy.clearCookies();
        cy.visit('http://localhost:4200/profile');
        cy.get('.user-firstname')
          .invoke('text')
          .should('eq', 'Nombre: ' + username);
      });
  });
});
