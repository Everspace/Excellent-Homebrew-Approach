const makeFolder = name => ({
  resolve: "gatsby-source-filesystem",
  options: {
    name: name,
    path: `${__dirname}/content/${name}`,
    ignore: [`**/\.*`]
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
    // makeFolder("Splats"),
    // makeFolder("Martial Arts"),
    makeFolder("Pages"),
    "gatsby-plugin-emotion",
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-source-name", "gatsby-remark-autolink-headers"]
      },
    },
    // {
    //   resolve: "gatsby-theme-homebrew-exalted",
    //   options: {
    //     hello: "world"
    //   }
    // },
    //Custom plugins
    "gatsby-remark-exalted",
  ],
}
