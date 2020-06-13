# API Docs

## [GET]: `/checkCNPJ/[cnpj]`

Verifica se o CNPJ informado é válido e existe.

**Retorno:**
- 400 (Bad Request), caso os dados não tenham sido enviados;
- 200 (OK) com o seguinte retorno:
```json
{
    "status": true, //true se o CNPJ existe, false caso contrário
    "cnpj": "00000000000000" // o CNPJ enviado ou "invalido", caso a string enviada não tenha formato de CNPJ
}
```

## [POST]: `/establishment`

Cadastra um novo estabelecimento.

**Corpo da requisição:**
```json
{
    "company_name": "Lorem ipsum dolor Ltda.",
    "cnpj": "00000000000000",
    "latitude": -0.0000,
    "longitude": -0.0000,
    "email": "lorem@ipsum.com",
    "password": "P4$$w0Rd",
    "category": "" //opcional
}
```

**Retorno:**
```json
{
    "status": true, //true se tiver tudo certo
    "message": "" //mensagem de erro se status === false
}
```

# Uso - Desenvolvimento

O ambiente precisa ter instalado o Node.js e o npm, bem como ter acesso a um banco de dados MySQL. Crie uma pasta `database` na raiz do projeto e, dentro dela, um arquivo `database.json` com as configurações do banco de dados, conforme:
```json
{
    "host": "",
    "user": "",
    "password": "",
    "database": "dbhack"
}
```
Então execute:
```sh
# Instala todas as dependências
$ npm i
# Migrações do banco de dados
$ npm run knex:migrate
# Executa o servidor na porta 3001
$ npm run dev
```
