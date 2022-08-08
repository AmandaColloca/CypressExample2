describe('Login Test', () => {

    it.only('Login Successfully', function () {
        cy.login()
        cy.visit('/', {
            auth: {
                username: 'stareb2b',
                password: 'ff299qdmqY',
            }
        })

    })

})
it('Login Failed', function () {

    cy.get(this.elements.not_logged_home.link_login).click()
    cy.get(this.elements.login.input_taxvat).type('05132165000140');
    cy.get(this.elements.login.input_pass).type('SenhaIncorreta');
    cy.get(this.elements.login.button_login).click().click().should(function () {
        expect('.icon-x-medium-1rQ icon-danger-21Q ').to.exist;
    })
    cy.get(this.elements.login.input_taxvat).clear().type('05132165000130');
    cy.get(this.elements.login.button_login).click().click();
    cy.get('.loginPage-errorMessage-2bt').should('have.text', 'Dados incorretos, por favor, tente novamente.');
})