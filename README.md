# API Docs

**Importante:** Todas as rotas esperam um header `Authorization` contendo `3502776c1707884a6b09ac4f450564d1`. Status 401 ou 403 serão retornados em caso de erro nessa autenticação.

## [GET]: `/checkCNPJ/[cnpj]`

Verifica se o CNPJ informado é válido e existe.

**Retorno:**
- 400 (Bad Request), caso os dados não tenham sido enviados;
- 200 (OK) com o seguinte retorno:
```jsonc
{
    "status": true, //true se o CNPJ existe, false caso contrário
    "cnpj": "00000000000000" // o CNPJ enviado ou "invalido", caso a string enviada não tenha formato de CNPJ
}
```

## [GET]: `/establishment`

Lista todos os estabelecimentos.

Esta rota aceita um filtro opcional de acordo com a latitude. Os seguintes parâmetros podem ser enviados na query:
- `latitude` - latitude do ponto desejado
- `longitude` - longitude do ponto desejado
- `radius` - raio em quilômetros para procurar (Opcional. padrão = 5)

**Retorno:**
```jsonc
{
    "status": true, // true se tiver tudo certo
    "message": "", // mensagem de erro se status === false
    "data": [{
        "id": 0,
        "company_name": "",
        "cnpj": "00000000000000",
        "latitude": -0.0000,
        "longitude": 0.0000,
        "email": "",
        "image": "",
        "category": null,
        "parking": false
    }] // array contendo os estabelecimentos encontrados
}
```

## [GET]: `/establishment/[id]`

Lista os dados do estabelecimento pelo id.

**Retorno:**
```jsonc
{
    "status": true, // true se tiver tudo certo
    "message": "", // mensagem de erro se status === false
    "data": {
        "id": 0,
        "company_name": "",
        "cnpj": "00000000000000",
        "latitude": -0.0000,
        "longitude": 0.0000,
        "email": "",
        "image": "",
        "category": null,
        "parking": false
    } // objeto contendo os dados do estabelecimento procurado
}
```

## [POST]: `/establishment`

Cadastra um novo estabelecimento.

**Corpo da requisição:**
```jsonc
{
    "company_name": "Lorem ipsum Ltda.",
    "cnpj": "00000000000000",
    "latitude": -0.0000,
    "longitude": -0.0000,
    "email": "lorem@ipsum.com",
    "password": "P4$$w0Rd",
    "category": "" //opcional
}
```

**Retorno:**
```jsonc
{
    "status": true, //true se tiver tudo certo
    "message": "" //mensagem de erro se status === false
}
```
## [POST]: `/establishment/login`

Autentica um estabelecimento e devolve um token.

**Corpo da requisição:**
```jsonc
{
    "email": "",
    "password": ""
}
```

**Retorno:**
```jsonc
{
    "status": true, // true se tiver tudo certo
    "message": "", // mensagem de erro se status === false
    "token": "", // se status === true
    "id": 0 // se status === true
}
```

## [PATCH]: `/establishment/[id]/image`

Adiciona a imagem de um estabelecimento.

**Corpo da requisição (multipart/form-data):**
```jsonc
{
    "token": "", //token retornado pela rota /establishment/login.
    "email": "",
    "image": "" //Uploaded image.
}
```

**Retorno:**
```jsonc
{
    "status": true, //true se tiver tudo certo
    "message": "" //mensagem de erro se status === false
}
```

## [GET]: `/products/[establishment_id]`

Lista os produtos de um estabelecimento.

**Retorno:**
```jsonc
{
    "status": true, // true se tiver tudo certo
    "message": "", // mensagem de erro se status === false
    "data": [{
        "id": 0,
        "title": "",
        "price": 12.99,
        "cashback": 0.05,
        "image": "",
        "description": ""
    }] // array contendo os produtos encontrados
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
