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

// src/use-cases/errors/org-already-exists.ts
var org_already_exists_exports = {};
__export(org_already_exists_exports, {
  OrgAlreadyExistsError: () => OrgAlreadyExistsError
});
module.exports = __toCommonJS(org_already_exists_exports);
var OrgAlreadyExistsError = class extends Error {
  constructor() {
    super("Org with this email already exists");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrgAlreadyExistsError
});
