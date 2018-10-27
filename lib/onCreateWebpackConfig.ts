const func = ({ actions, stage }) => {
  switch (stage) {
    case `develop`:
      actions.setWebpackConfig({
        devtool: `inline-module-source-map`,
      })
      break
  }
}

export default func
