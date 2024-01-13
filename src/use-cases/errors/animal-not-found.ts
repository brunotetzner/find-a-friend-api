export class AnimalNotFoundError extends Error {
  constructor() {
    super("Animal not found");
  }
}
