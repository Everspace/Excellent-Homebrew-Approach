export class MissingDataError extends Error {
  constructor(property, path) {
    super(
      `${property} in ${path} was missing in the frontmatter! Please define it`,
    )
  }
}
