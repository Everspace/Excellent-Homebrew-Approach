var slash = require("slash")

var makeFolder = name => ({
  resolve: "gatsby-source-filesystem",
  options: {
    name: name,
    path: `${__dirname}/content/${name}`,
  },
})

module.exports = {
  siteMetadata: {
    title: "Exellent Homebrew Approach",
  },
  plugins: [
    makeFolder("Artifacts"),
    makeFolder("Splats"),
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-next",
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-component", "gatsby-remark-source-name"],
      },
    },
    //Custom plugins
    {
      resolve: "gatsby-remark-exalted",
      options: {
        basedir: slash(__dirname),
      },
    },
  ],
}
