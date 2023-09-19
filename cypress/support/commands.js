// -- Global Commands --
Cypress.Commands.add('alidateUrl', (url) => {
    cy.url().should('contain', url);
})

Cypress.Commands.add('accessPageAndValidate', (page, url) => {
    cy.visit(page);
    cy.alidateUrl(url);
});

// -- Home Page Commands --
Cypress.Commands.add('validateHomeAndClickEnter', (url) => {
    cy.intercept('GET', 'https://production.na01.natura.com/s/TbsBrazil/dw/shop/**').as('waitHomePage');
    cy.wait('@waitHomePage');
    cy.get('header[class*="MuiPaper-elevation2"] div[class*=NatDSAppBarHighlight]').eq(1).should('be.visible');
    cy.get('header[class*="MuiAppBar-colorPrimary"]').should('be.visible');
    cy.get('a[data-testid="header-login-button"] span[class="MuiTypography-root MuiTypography-caption MuiTypography-colorInherit"]').should('be.visible').click();
    cy.alidateUrl(url);
});

// -- Login page commands --
Cypress.Commands.add('validatePageLogin', () => {
    cy.get('div[class*="MuiToolbar-root MuiToolbar-dense"]').should('be.visible');
    cy.get('input[id="login-field"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
});

// -- Register Page Commands --
Cypress.Commands.add('criateNewUser', (url, name, lastName, email, password, cpf, dateOfBirth, phone) => {
    cy.validatePageLogin();
    cy.get('button[type="button"][class*="MuiButton-fullWidth"]').should('be.visible').click();
    cy.alidateUrl(url);
    cy.get('div[class*="MuiPaper-rounded"]').should('be.visible');
    cy.get('input[name="firstName"]').should('be.visible').type(name);
    cy.get('input[name="lastName"]').should('be.visible').type(lastName);
    cy.get('input[name="email"]').should('be.visible').type(email);
    cy.get('input[id="receiveNewsLetter"]').uncheck();
    cy.get('input[id="password-field"]').should('be.visible').type(password, { log: false });
    cy.get('input[id="confirmPassword-field"]').should('be.visible').type(password, { log: false });
    cy.get('input[name="cpf"]').should('be.visible').type(cpf);
    cy.get('input[value="male"]').check();
    cy.get('input[name="dateOfBirth"]').should('be.visible').type(dateOfBirth);
    cy.get('input[name="homePhone"]').should('be.visible').type(phone);
    cy.get('input[id="receiveNewsLetterSms"]').uncheck();
    cy.get('input[id="infContOptIn"]').uncheck();
    cy.get('input[id="acceptedterms"]').check();
    cy.get('button[type="submit"]').should('be.visible').click({ force: true });
});

Cypress.Commands.add('validateSuccessfullyRegisteredUser', (name) => {
    cy.intercept('POST', 'https://production.na01.natura.com/s/TbsBrazil/dw/**').as('waitToReturnHome');
    cy.wait('@waitToReturnHome');
    cy.get('h6[class="MuiTypography-root MuiTypography-subtitle2"]').should('contain.text', `Olá, ${name}!`)
    cy.log('User Registered Successfully!')
});
