export class InvalidEntryError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'InvalidEntryError'
  }
}
