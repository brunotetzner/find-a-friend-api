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

// src/repositories/in-memory/in-memory-orgs-repository.ts
var in_memory_orgs_repository_exports = {};
__export(in_memory_orgs_repository_exports, {
  InMemoryOrgsRepository: () => InMemoryOrgsRepository
});
module.exports = __toCommonJS(in_memory_orgs_repository_exports);
var InMemoryOrgsRepository = class {
  constructor() {
    this.items = [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data) {
    return Promise.resolve({});
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryOrgsRepository
});
