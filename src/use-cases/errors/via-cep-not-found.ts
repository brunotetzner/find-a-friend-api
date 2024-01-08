export class ViaCepNotFoundError extends Error {
  constructor() {
    super("zipCode not found");
  }
}
