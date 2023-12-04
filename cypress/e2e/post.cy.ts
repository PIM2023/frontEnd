describe('when not logged in', () => {
    it('shouldnt visit the home page if the user is not logged in', () => {
      cy.visit('/home');
      cy.url().should('not.contain', '/home');
      cy.url().should('contain', '/login');
    });
});
  
describe('when logged in', () => {
    beforeEach(() => {
      cy.login('marceldeltoro23@gmail.com', 'marcel').then(() => {
        cy.visit('/home');
        cy.wait(1000);
      });
    });

    it('Debería mostrar el título para crear un nuevo post', () => {
        cy.get('#open-modal').click();
        cy.get('ion-title').should('have.text', 'Nuevo post');
    });

    it('Debería poder abrir y cerrar el modal', () => {
        cy.get('#open-modal').click();
        cy.get('ion-button').contains('Cancelar').click();
        cy.get('ion-modal').should('not.exist');
    });
    
    it('Debería mostrar un error al intentar confirmar sin una imagen', () => {
        cy.get('#open-modal').click();
        cy.get('ion-button').contains('Publicar').click();
        cy.get('.toast-message').should('contain', 'Debes seleccionar una imagen');
    });
    
    it('Debería crear exitosamente un post', () => {
        cy.get('#open-modal').click();
        cy.fixture('icon/clout.png', 'base64').then((fileContent) => {
            const image = `data:image/png;base64,${fileContent}`;
            cy.window().its('app').invoke('takePicture', image);
        });

        cy.get('ion-input').type('This is a test description');
        
        cy.get('ion-select').click();
        cy.get('ion-select-option[value="verano"]').click();
        cy.get('ion-select-option[value="invierno"]').click(); 

        cy.get('ion-button').contains('Publicar').click();
        cy.wait(2000); 
        cy.get('.toast-message').should('contain', 'Post created successfully');
    
        cy.get('ion-list').contains('This is a test description').should('exist');
    });
});