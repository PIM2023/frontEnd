describe('when not logged in', () => {
  it('shouldnt visit the calendar page if the user is not logged in', () => {
    cy.visit('/calendar');
    cy.url().should('not.contain', '/calendar');
    cy.url().should('contain', '/login');
  });
});

describe('when logged in', () => {
  beforeEach(() => {
    cy.login('marceldeltoro23@gmail.com', 'marcel').then(() => {
      cy.visit('/home');
      cy.wait(1000);
      cy.visit('/calendar');
    });
  });

  it('Debería mostrar el título del calendario', () => {
    cy.visit('/calendar');
    cy.get('ion-title[id="month-name"]').should('have.text', 'diciembre 2023');
    cy.wait(100);
  });

  it('Debería mostrar el componente de calendario', () => {
    cy.visit('/calendar');
    cy.get('calendar').should('exist');
    cy.wait(500);
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

  it('Debería mostrar los eventos al seleccionar un día con eventos', () => {
    cy.visit('/calendar');
    cy.get('.monthview-primary-with-event').first().click();
    cy.get('.post-container').should('exist');
  });

  it('Debería mostrar el label de que no hay eventos al seleccionar un día sin eventos', () => {
    cy.visit('/calendar');
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
