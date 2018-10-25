const slash = require("slash")

const makeFolder = name => ({
  resolve: "gatsby-source-filesystem",
  options: {
    name: name,
    path: `${__dirname}/content/${name}`,
  },
})

module.exports = {
  siteMetadata: {
    title: "Excellent Homebrew Approach",
    shortTitle: "EHA",
    description: "An excellent approach to homebrew",
  },
  plugins: [
    makeFolder("Artifacts"),
    makeFolder("Splats"),
    "gatsby-plugin-emotion",
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-component", "gatsby-remark-source-name"],
      },
    },
    "gatsby-plugin-typescript",
    //Custom plugins
    "gatsby-remark-exalted",
  ],
}
