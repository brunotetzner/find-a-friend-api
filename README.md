# Find-a-Friend API Documentation

Welcome to the Find-a-Friend API documentation! This API enables the registration and search of animals for adoption, as well as the registration and authentication of responsible organizations. Below are details about the application rules, business rules, application context, and available endpoints.

## Application Rules

### Functional Requirements (FR)

#### Animal registration:

- It should be possible to register a pet.
- It should be possible to list all animals available for adoption in a city.
- It should be possible to filter animals by their characteristics.
- It should be possible to view details of a pet for adoption.

#### Organization Registration (ORG):

- It should be possible to register as an ORG.
- It should be possible to log in as an ORG.

### Business Rules (BR)

#### Animal listing:

- To list the animals, it is mandatory to inform the city.
- All filters, in addition to the city, are optional.

#### ORG registration:

- An ORG needs to have an address and a WhatsApp number.
- An ORG must be associated with a pet.

#### Animal Adoption:

- The user who wants to adopt will contact the ORG via WhatsApp.

#### Admin Access:

- For an ORG to access the application with a JWT token to manage its registration and animals for adoption.

## Endpoints

### animals

#### Register animal:

- **Endpoint:** `POST /animal`

```json
{
  "type": "dog"
  "name": "tutu",
  "age": 8,
  "weight": 12,
  "temperament": "docile",
  "breed": "",
  "description": "A beautiful dog",
  "address": {
    "zipCode": "13836242",
    "street": "Rua Exemplo, 123",
    "city": "Cidade Exemplo",
    "state": "Estado Exemplo",
    "country": "País Exemplo",
    "addressNumber": 12
  },
}
```

#### List animals:

- **Endpoint:** `GET /animal/list?city=Conchas&weight=10&minAge=1&maxAge=8`

#### Animal details:

- **Endpoint:** `GET /animal/:id/`

#### Delete animal:

- **Endpoint:** `DELETE /animal/:id`
- JWT IS REQUIRED

#### Update pet:

- **Endpoint:** `PATCH /animal/:id`
- JWT IS REQUIRED

```json
{
  "type": "dog"
  "name": "tutu",
  "age": 8,
  "weight": 12,
  "temperament": "docile",
  "breed": "",
  "description": "A beautiful dog",
}
```

### ORG

#### Register ORG:

- **Endpoint:** `POST /ORG/register`

```json
{
  "name": "Centro de adoção de madureira",
  "phone": "+55111111111",
  "email": "centro@madureira.com",
  "password": "12345",
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

#### Org details:

- **Endpoint:** `GET /org/me`
- JWT IS REQUIRED

#### Delete org:

- **Endpoint:** `DELETE /org/:id`
- JWT IS REQUIRED

#### Update org:

- **Endpoint:** `PATCH /org/:id`
- JWT IS REQUIRED

```json
{
  "name": "Centro de adoção de madureira",
  "phone": "+55111111111",
  "email": "centro@madureira.com",
  "password": "12345",
  "description": ""
}
```

#### Redirect to org whatsapp

- **Endpoint:** `GET /org/:id/whatsapp`

## How to run the project

### 1 - Docker compose

This application utilizes PostgreSQL running in a Docker container for local development. Therefore, the first step is to execute the following command:

```bash
docker compose up -d
```

### 2 - Environment

Create an .env file and refer to the .env.example to configure your environments. You can obtain the database credentials from the Docker Compose file.

### 3 - Dependences

Run the command "npm i" to install the dependencies.

### 4 - Migrations and run project

Now you should run the following command to run the migrations:

```bash
npx prisma migrate dev
```

After that, you can run the application using the following command:

```
npm run start:dev
```

### 5 - Tests

This application includes unit and integration tests. Verify if everything is working by running the following commands:

```
npm run test

npm run pretest:e2e
npm run tes:e2e
```
