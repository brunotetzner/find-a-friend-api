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

// src/use-cases/factories/make-register-address-use-case.ts
var make_register_address_use_case_exports = {};
__export(make_register_address_use_case_exports, {
  makeRegisterAddressUseCase: () => makeRegisterAddressUseCase
});
module.exports = __toCommonJS(make_register_address_use_case_exports);

// src/use-cases/register-address.ts
var import_axios = __toESM(require("axios"));

// src/use-cases/errors/via-cep-not-found.ts
var ViaCepNotFoundError = class extends Error {
  constructor() {
    super("zipCode not found");
  }
};

// src/use-cases/register-address.ts
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

// src/lib/prisma.ts
var import_client = require("@prisma/client");

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

// src/lib/prisma.ts
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

// src/use-cases/factories/make-register-address-use-case.ts
function makeRegisterAddressUseCase() {
  const AddressRepository = new PrismaAddressRepository();
  const useCase = new RegisterAddressUseCase(AddressRepository);
  return useCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeRegisterAddressUseCase
});
