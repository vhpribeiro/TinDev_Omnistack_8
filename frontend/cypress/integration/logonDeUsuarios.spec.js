describe('Meu primeiro teste solo', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('Deve verificar se existe o logo, o input e o botão', () => {
        cy.get('#logoTindev');
        cy.get('#inputTindev');
        cy.get("#btnTindev");
    });

    it('Deve acessar a página de likes e dislikes ao digitar um usuário cadastrado', () => {
        const idDoDevTestado = '5d50a253a98c1251c0fa128e';
        const nomeDoUsuarioNoGithub = 'vhpribeiro';

        cy.get('#inputTindev').type(`${nomeDoUsuarioNoGithub}`);
        cy.get('#btnTindev').click();

        cy.url().should('include', `/dev/${idDoDevTestado}`);
    });

    it('Não deve acessar a página de likes e dislike ao digitar um usuário não cadastrado', () => {
        const nomeDoUsuarioNoGithub = '123';

        cy.get('#inputTindev').type(`${nomeDoUsuarioNoGithub}`);
        cy.get('#btnTindev').click();

        cy.url().should('not.include', '/dev/');
    });

    it('Deve informar que não há mais devs para dar like ou dislike', () => {
        const nomeDoUsuarioNoGithub = 'vhpribeiro';

        cy.get('#inputTindev').type(`${nomeDoUsuarioNoGithub}`);
        cy.get('#btnTindev').click();
        
        cy.get('.empty').contains('Acabou :(');
    });
})