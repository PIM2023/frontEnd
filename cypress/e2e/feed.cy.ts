describe('when not logged in', () => {
  it('shouldnt visit the home page if the user is not logged in', () => {
    cy.visit('/home');
    cy.url().should('not.contain', '/home');
    cy.url().should('contain', '/login');
  });
});

describe('when logged in', () => {

  it('Debería ver y dar like a una publicación', () => {
    // Selecciona la primera publicación en la página de inicio y verifica su existencia
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    cy.get('.post-item').first().as('firstPost');
    cy.get('@firstPost').should('exist');

    // Verifica que el botón de like exista y simula hacer click en él
    cy.get('@firstPost').find('ion-button[fill="clear"]').first().click();

    // Verifica si el contador de likes se ha actualizado
    cy.get('@firstPost')
      .find('.post-stats strong')
      .should('have.text', '1 likes');
  });
/*
  it('Debería abrir y cerrar la sección de comentarios de una publicación', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    // Selecciona la primera publicación en la página de inicio
    cy.get('.post-item').first().as('firstPost');

    // Verifica que el botón para abrir los comentarios esté presente y simula hacer click en él
    cy.get('@firstPost').find('ion-button[name="chatbubble-outline"]').click();

    // Verifica si la sección de comentarios se ha abierto
    cy.get('.comments').should('be.visible');

    // Verifica si la sección de comentarios se cierra correctamente
    cy.get('@firstPost').find('ion-button[name="chatbubble-outline"]').click();
    cy.get('.comments').should('not.be.visible');
  });

  it('Debería copiar la URL de una publicación al portapapeles', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    // Selecciona la primera publicación en la página de inicio
    cy.get('.post-item').first().as('firstPost');

    // Verifica que el botón para copiar la URL esté presente y simula hacer click en él
    cy.get('@firstPost')
      .find('ion-button[name="share-social-outline"]')
      .click();

    // Verifica si se muestra el mensaje de que la URL se ha copiado correctamente
    cy.get('.toast-message').should('contain', 'URL copiada al portapapeles');
  });

  it('Debería editar la descripción de una publicación', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    // Selecciona la primera publicación en la página de inicio
    cy.get('.post-item').first().as('firstPost');

    // Verifica si el botón de edición está presente y simula hacer click en él
    cy.get('@firstPost')
      .find('ion-col[size="auto"] ion-icon[name="create-outline"]')
      .click();

    // Verifica si el input de edición está presente y modifica la descripción
    cy.get('ion-input[label="Escribe la nueva descripción"]')
      .as('editInput')
      .type('Nueva descripción');
    cy.get('@firstPost').find('ion-button[strong="true"]').click();

    // Verifica si la descripción se ha actualizado correctamente
    cy.get('@firstPost')
      .find('.post-comments')
      .should('contain', 'Nueva descripción');
  });*/

  it('Debería dar like y deshacer like en una publicación', () => {
    cy.visit('https://clout-pin.web.app/login');
        cy.get('#ion-input-0').type('yoy75@upv.es');
        cy.get('#ion-input-1').type('password');
        cy.wait(2000);
        cy.get('ion-button').first().click();
        cy.get('ion-button').first().click();
        cy.wait(2500);
    // Selecciona la primera publicación en la página de inicio
    cy.get('.post-item').first().as('firstPost');

    // Verifica si el botón de like existe y simula hacer click para dar like
    cy.get('@firstPost').find('ion-button[fill="clear"]').first().click();

    // Verifica si el contador de likes se ha actualizado
    cy.get('@firstPost')
      .find('.post-stats strong')
      .should('have.text', '1 likes');

    // Simula hacer click nuevamente para deshacer el like
    cy.get('@firstPost').find('ion-button[fill="clear"]').first().click();

    // Verifica si el contador de likes se ha actualizado al deshacer el like
    cy.get('@firstPost')
      .find('.post-stats strong')
      .should('have.text', '0 likes');
  });
});
