/// <reference types="cypress" />
const url = require('../../fixtures/urls.json')
var faker = require('faker-br');
const nome = faker.name.firstName();
const sobrenome = faker.name.lastName();
const email = faker.internet.email(nome, sobrenome);
const numeroSenha = faker.random.number(1000);
const caracteresEspeciais = faker.random.arrayElement("!@#$%^&*()_+");
const senha = faker.internet.password() + numeroSenha + caracteresEspeciais;
const cpf = faker.br.cpf();
const data = "01031995";
const numero = faker.phone.phoneNumber('###########');

describe('Cadastro de usuario', () => {

  context('Novo usuario se cadastrando no site do thebodyshop', () => {
    beforeEach(() => {
      cy.acessarPaginaEValidar('/', url.thebodyshopHome);
    });
    // it('Cadastrar usuario preenchendo todos os campos', { retries: { runMode: 2, openMode: 2 }, }, () => {
    it('Cadastrar usuario preenchendo todos os campos', () => {
      cy.validarHomeEClicarEmEntrar(url.thebodyshopLogin);
      cy.cadastrarNovoUsuario(url.thebodyshopCadastro, nome, sobrenome, email, senha, cpf, data, numero);
      cy.validarUsuarioCadastradoComSucesso(nome);
      cy.validarUrl(url.thebodyshopHome);
    });
  });
})

