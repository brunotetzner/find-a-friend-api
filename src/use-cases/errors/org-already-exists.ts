export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Org with this email already exists");
  }
}
