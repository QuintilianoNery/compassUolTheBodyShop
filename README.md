<h1 align="center">compassUolTheBodyShop</h1>

<p align="center"><img src="thebodyshop.png" width="100%"/></p>

--------

## Configurando o Ambiente :gear

- [Cypress.io](http://www.cypress.io)

- [Documentação Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

### Requisitos para instalação

- [Node.js](https://nodejs.org/en/)
- [Java 8 ou superrior caso use o Allure Report](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=244036_89d678f2be164786b292527658ca1605)

### Instalação do NPM e instalação do Cypress

Na pasta do projeto abra o terminal ou no VSCode use o Ctrl + ' (aspas simples), e digite os comandos abaixo:

```shell
npm init -y
npm install --yes
npm install cypress@12.17.4 -d
npm i faker-br --dev
```

### Comandos para iniciar o Cypress :gear

#### Iniciar o Cypress no navegador

```shell
   npx cypress open
```

#### Para executar em modo headless

```shell
   npx cypress run
```

OBS.: Para executar os testes usando o Allure report, é só executar os três scripts um após o outro, que estão no arquivo package.json

Este pode ser disponibilizado após ser gerado em um servidor de CI/CD, como o Git ou Azure devops, por exemplo.

```shell
   npx cypress run --config video=false --env allure=true
   allure generate allure-results
   allure open allure-report
```
