import chalk from "chalk"

export const missingDataError = (property: string, path: string) => {
  console.error(
    chalk`\n{red Error} - {yellow ${path}} is missing the property "{yellow ${property}}"`,
    "in the frontmatter.",
  )
}
