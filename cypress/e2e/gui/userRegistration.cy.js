/// <reference types="cypress" />
const url = require('../../fixtures/urls.json')
var faker = require('faker-br');
const name = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email(name, lastName);
const randomNumber = faker.random.number(1000);
const randomSpecialCharacters = faker.random.arrayElement("!@#$%^&*()_+");
const password = faker.internet.password() + randomNumber + randomSpecialCharacters;
const cpf = faker.br.cpf();
const dateOfBirth = "01031995";
const phone = faker.phone.phoneNumber('###########');

describe('User registration', () => {

  context('New user registering on the The Body Shop website', () => {
    beforeEach(() => {
      cy.accessPageAndValidate('/', url.thebodyshopHome);
    });

    it('Register user by filling in all fields', () => {
      cy.validateHomeAndClickEnter(url.thebodyshopLogin);
      cy.criateNewUser(url.thebodyshopCadastro, name, lastName, email, password, cpf, dateOfBirth, phone);
      cy.validateSuccessfullyRegisteredUser(name);
      cy.validateUrl(url.thebodyshopHome);
    });
  });
})


//Eu preferi deixar a massa de dados no próprio teste, pois acredito que assim fica mais fácil de entender o que está sendo testado e qual massa de dados está sendo gerada.
//Mas no entando pode-se deixar no arquivo de comandos customizados, já que em um projeto grande, podemos criar vários arquivos de custom commands para organizar melhor o código,
//então não teria problema de deixar a massa de dados no arquivo de comandos customizados.

//Outra observação é que foi realizado apenas o cenário feliz de cadastro de usuário, necessariamente deve ser criado outros cenários, como:
// - Cenário de cadastro de usuário com campos obrigatórios em branco
// - Login com sucesso de um usuário
// - Login de usuário já cadastrado
// - Cadastro de usuário averiguando se o CPF já está cadastrado
// - Cadastro de usuário averiguando se o e-mail já está cadastrado
// - Cadastro de usuário averiguando limite valor de cada campo, se está respeitando conforme a documentação
// - Sem contar também todos os outros cenários realacionado à um ecommerce, como: adicionar produto no carrinho, remover produto do carrinho, finalizar compra, etc.