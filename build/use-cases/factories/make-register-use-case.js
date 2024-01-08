"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/factories/make-register-use-case.ts
var make_register_use_case_exports = {};
__export(make_register_use_case_exports, {
  makeRegisterUseCase: () => makeRegisterUseCase
});
module.exports = __toCommonJS(make_register_use_case_exports);

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

// src/use-cases/errors/org-already-exists.ts
var OrgAlreadyExistsError = class extends Error {
  constructor() {
    super("Org with this email already exists");
  }
};

// src/use-cases/register.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeRegisterUseCase
});
