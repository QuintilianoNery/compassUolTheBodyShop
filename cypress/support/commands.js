// -- Commands Gerais --
Cypress.Commands.add('validarUrl', (url) => {
    cy.url().should('contain', url);
})

Cypress.Commands.add('acessarPaginaEValidar', (pagina, url) => {
    cy.visit(pagina);
    cy.validarUrl(url);
});

// -- Commands Home --
Cypress.Commands.add('validarHomeEClicarEmEntrar', (url) => {
    cy.intercept('GET', 'https://production.na01.natura.com/s/TbsBrazil/dw/shop/**').as('homeThebodyshop');
    cy.wait('@homeThebodyshop');
    cy.get('header[class*="MuiPaper-elevation2"] div[class*=NatDSAppBarHighlight]').eq(1).should('be.visible');
    cy.get('header[class*="MuiAppBar-colorPrimary"]').should('be.visible');
    cy.get('a[data-testid="header-login-button"] span[class="MuiTypography-root MuiTypography-caption MuiTypography-colorInherit"]').should('be.visible').click();
    cy.validarUrl(url);
});

// -- Commands Login --
Cypress.Commands.add('validarPaginaLogin', () => {
    cy.get('div[class*="MuiToolbar-root MuiToolbar-dense"]').should('be.visible');
    cy.get('input[id="login-field"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
});

// -- Commands Cadastro --
Cypress.Commands.add('cadastrarNovoUsuario', (url, nome, sobrenome, email, senha, cpf, data, numero) => {
    cy.validarPaginaLogin();
    cy.get('button[type="button"][class*="MuiButton-fullWidth"]').should('be.visible').click();
    cy.validarUrl(url);
    cy.get('div[class*="MuiPaper-rounded"]').should('be.visible');
    cy.get('input[name="firstName"]').should('be.visible').type(nome);
    cy.get('input[name="lastName"]').should('be.visible').type(sobrenome);
    cy.get('input[name="email"]').should('be.visible').type(email);
    cy.get('input[id="receiveNewsLetter"]').uncheck();
    cy.get('input[id="password-field"]').should('be.visible').type(senha, { log: false });
    cy.get('input[id="confirmPassword-field"]').should('be.visible').type(senha, { log: false });
    cy.get('input[name="cpf"]').should('be.visible').type(cpf);
    cy.get('input[value="male"]').check();
    cy.get('input[name="dateOfBirth"]').should('be.visible').type(data);
    cy.get('input[name="homePhone"]').should('be.visible').type(numero);
    cy.get('input[id="receiveNewsLetterSms"]').uncheck();
    cy.get('input[id="infContOptIn"]').uncheck();
    cy.get('input[id="acceptedterms"]').check();
    cy.get('button[type="submit"]').should('be.visible').click({ force: true });
});

Cypress.Commands.add('validarUsuarioCadastradoComSucesso', (nome) => {
    cy.intercept('POST', 'https://production.na01.natura.com/s/TbsBrazil/dw/**').as('aguardarRetornoHome');
    // cy.intercept('GET', 'https://www.thebodyshop.com.br/**').as('homeThebodyshop');
    cy.wait('@aguardarRetornoHome');
    cy.get('h6[class="MuiTypography-root MuiTypography-subtitle2"]').should('contain.text', `Olá, ${nome}!`)
    cy.log('Usuario cadastrado com sucesso!')
});
