describe('Prueba de login', () => {
    it('verifica que el login funcione', () => {
        cy.visit('/login');
        cy.get('#username').type('admin');
        cy.get('#password').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Bienvenido').should('be.visible');
    });
});