# find-a-friend-api

### Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

### Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

## ROUTES

#### /pet

- [POST] /create

```json
{
  "type": "dog",
  "name": "tutu",
  "age": 8,
  "weight": 12,
  "temperament": "docile",
  "breed": "",
  "address": {
    "zipCode": "13836242",
    "street": "Rua Exemplo, 123",
    "city": "Cidade Exemplo",
    "state": "Estado Exemplo",
    "country": "País Exemplo",
    "addressNumber": 12
  },
  "description": ""
}
```

- [get] /list/:city&size=12?weight=10?minAge=1?maxAge=8

- [get] :id/

- [delete] /:id

- [patch/put] /:id

#### /ORG

- [POST] /register

```json
{
  "name": "Centro de adoção de madureira",
  "phone": "+55111111111"
  "email": "centro@madureira.com",
  "password": "12345"
  "address": {
    "zipCode": "13836242",
    "street": "Rua Exemplo, 123",
    "city": "Cidade Exemplo",
    "state": "Estado Exemplo",
    "country": "País Exemplo",
    "addressNumber": 12
  },
  "description": ""
}
```

- [POST] /auth

```json
{
  "email": "centro@madureira.com",
  "password": "12345"
}
```

- [POST] /refresh
- [GET] /me
- [DELETE] /
- [PATCH/PUT] /
