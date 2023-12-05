describe('when not logged in', () => {
  it('shouldnt visit the calendar page if the user is not logged in', () => {
    cy.visit('/calendar');
    cy.url().should('not.contain', '/calendar');
    cy.url().should('contain', '/login');
  });
});

describe('when logged in', () => {

  it('Debería mostrar el título del calendario', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    cy.visit('https://clout-pin.web.app/calendar');
    cy.get('ion-title').should('have.text', 'diciembre 2023');
    cy.wait(1000);
  });

  it('Debería mostrar el componente de calendario', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    cy.visit('https://clout-pin.web.app/calendar');
    cy.get('calendar').should('exist');
    cy.wait(1500);
  });

  // it('should change month when swiping', () => {
  //   cy.get('calendar').should('exist');
  //   cy.wait(2000);
  //   cy.get('.swiper-wrapper').invoke(
  //     'attr',
  //     'style',
  //     'transition-duration: 0ms; transform: translate3d(-705.773px, 0px, 0px); transition-delay: 0ms;'
  //   );
  //   cy.get('.swiper-wrapper').trigger('touchend', { force: true });
  //   cy.wait(2000);
  //   cy.get('ion-title').should('have.text', 'enero 2024');
  // });

  /*it('Debería mostrar los eventos al seleccionar un día con eventos', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    cy.visit('https://clout-pin.web.app/calendar');
    cy.get('.monthview-primary-with-event').first().click();
    cy.get('.post-container').should('exist');
  });*/

  it('Debería mostrar el label de que no hay eventos al seleccionar un día sin eventos', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    cy.visit('https://clout-pin.web.app/calendar');
    cy.get('td:not([class])')
      .first()
      .invoke('show') // Asegurarse de que el elemento sea visible
      .click();

    cy.wait(1000);

    cy.get('.event').should(
      'have.text',
      ' No hay ningun post creado este día '
    );
  });
});
