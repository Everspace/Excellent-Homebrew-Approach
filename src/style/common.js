import { css } from "emotion"

export const spacingUnit = 1
export const cardClass = css`
  margin: ${spacingUnit / 2}em;
  padding: ${spacingUnit / 2}em;
  box-shadow: 0px 4px 15px rgba(10, 10, 10, 0.15),
    0px 4px 5px rgba(10, 10, 10, 0.25);
`

export const pageContentClass = css`
  /*
    When a react component ends up in a markdown section that would be like a paragraph,
    it replaces the p with a div, and ruins everything.
  */
  & > p {
    display: block; /* Render like div */
  }
  & > div {
    padding-bottom: 1.45rem; /* Render like p for now */
  }
`
