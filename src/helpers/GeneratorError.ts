export default class GeneratorError extends Error {
  static isGeneratorError(e: unknown): e is GeneratorError {
    return e instanceof GeneratorError
  }
}
