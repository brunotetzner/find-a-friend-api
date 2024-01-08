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

// src/use-cases/register.ts
var register_exports = {};
__export(register_exports, {
  RegisterUseCase: () => RegisterUseCase
});
module.exports = __toCommonJS(register_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUseCase
});
