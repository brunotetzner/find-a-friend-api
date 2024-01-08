"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = require("fastify");
var import_zod3 = require("zod");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333),
  JWT_SECRET: import_zod.z.string().default("secret")
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error(" Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/app.ts
var import_jwt = __toESM(require("@fastify/jwt"));

// src/use-cases/errors/org-already-exists.ts
var OrgAlreadyExistsError = class extends Error {
  constructor() {
    super("Org with this email already exists");
  }
};

// src/use-cases/errors/via-cep-not-found.ts
var ViaCepNotFoundError = class extends Error {
  constructor() {
    super("zipCode not found");
  }
};

// src/use-cases/delete-address.ts
var DeleteAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async execute(id) {
    await this.addressRepository.delete(id);
  }
};

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-address-repository.ts
var PrismaAddressRepository = class {
  async create(data) {
    const address = await prisma.address.create({ data });
    return address;
  }
  async delete(id) {
    await prisma.address.delete({ where: { id } });
  }
};

// src/use-cases/factories/make-delete-address-use-case.ts
function makeDeleteAddressUseCase() {
  const AddressRepository = new PrismaAddressRepository();
  const useCase = new DeleteAddressUseCase(AddressRepository);
  return useCase;
}

// src/use-cases/register-address.ts
var import_axios = __toESM(require("axios"));
var RegisterAddressUseCase = class {
  constructor(addressRepository) {
    this.addressRepository = addressRepository;
  }
  async execute(body) {
    let viaCepResponse = {
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
      ibge: "",
      gia: "",
      ddd: "",
      siafi: ""
    };
    const apiUrl = "https://viacep.com.br/ws";
    await import_axios.default.get(`${apiUrl}/${body.zipCode}/json`).then((res) => {
      const response = res.data;
      console.log(response);
      if (response.erro) {
        throw new ViaCepNotFoundError();
      }
      viaCepResponse = response;
    }).catch(() => {
      throw new ViaCepNotFoundError();
    });
    const addressBody = {
      zipCode: body.zipCode,
      street: viaCepResponse.logradouro || body.street,
      city: viaCepResponse.localidade || body.city || "",
      state: viaCepResponse.uf || body.state || "",
      country: "Brasil",
      addressNumber: body.addressNumber
    };
    const address = await this.addressRepository.create(addressBody);
    return { address };
  }
};

// src/use-cases/factories/make-register-address-use-case.ts
function makeRegisterAddressUseCase() {
  const AddressRepository = new PrismaAddressRepository();
  const useCase = new RegisterAddressUseCase(AddressRepository);
  return useCase;
}

// src/repositories/prisma/prisma-orgs-repository.ts
var PrismaOrgRepository = class {
  async create(data) {
    const Org = await prisma.org.create({ data });
    return Org;
  }
  async findByEmail(email) {
    const Org = await prisma.org.findUnique({ where: { email } });
    return Org || null;
  }
};

// src/use-cases/register.ts
var import_bcryptjs = require("bcryptjs");
var RegisterUseCase = class {
  constructor(orgsRepository) {
    this.orgsRepository = orgsRepository;
  }
  async execute(body) {
    const orgWithTheSameEmail = await this.orgsRepository.findByEmail(
      body.email
    );
    if (orgWithTheSameEmail) {
      throw new OrgAlreadyExistsError();
    }
    const password_hash = await (0, import_bcryptjs.hash)(body.password, 6);
    const orgData = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      addressId: body.addressId,
      password_hash
    };
    const org = await this.orgsRepository.create(orgData);
    return { org };
  }
};

// src/use-cases/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const OrgsRepository = new PrismaOrgRepository();
  const useCase = new RegisterUseCase(OrgsRepository);
  return useCase;
}

// src/http/controllers/orgs/register.ts
var import_zod2 = require("zod");
async function register(request, reply) {
  const orgDataBodySchema = import_zod2.z.object({
    name: import_zod2.z.string().min(3).max(255),
    phone: import_zod2.z.string().min(14).max(14),
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6).max(255)
  });
  const orgAddressBodySchema = import_zod2.z.object({
    zipCode: import_zod2.z.string().min(8).max(8),
    street: import_zod2.z.string().optional(),
    city: import_zod2.z.string().optional(),
    state: import_zod2.z.string().max(2).min(2).optional(),
    country: import_zod2.z.string(),
    addressNumber: import_zod2.z.string()
  });
  const orgData = orgDataBodySchema.parse(request.body);
  const orgAddressData = orgAddressBodySchema.parse(request?.body?.address);
  let createdAddress;
  try {
    const registerUseCase = makeRegisterUseCase();
    const registerAddressUseCase = makeRegisterAddressUseCase();
    const { address } = await registerAddressUseCase.execute(orgAddressData);
    createdAddress = address;
    await registerUseCase.execute({ ...orgData, addressId: address.id });
  } catch (err) {
    const deleteAddressUseCase = makeDeleteAddressUseCase();
    if (createdAddress) {
      await deleteAddressUseCase.execute(createdAddress.id);
    }
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    if (err instanceof ViaCepNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
  return reply.status(201).send();
}

// src/http/controllers/orgs/routes.ts
async function OrgRoutes(app2) {
  app2.post("/org", register);
}

// src/app.ts
var import_cookie = __toESM(require("@fastify/cookie"));
var app = (0, import_fastify.fastify)();
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "10m"
  }
});
app.register(import_cookie.default);
app.register(OrgRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod3.ZodError) {
    reply.status(400).send({ message: "validation error", issue: error.format() });
    return;
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  }
  reply.status(500).send({ message: "internal server error" });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
