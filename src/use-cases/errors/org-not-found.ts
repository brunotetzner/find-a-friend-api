export class OrgNotFoundError extends Error {
  constructor() {
    super("org not found");
  }
}
