import React from "react"
import { cardClass } from "../style/common"
import RenderAst from "../lib/RenderAst"
import dashify from "dashify"

const MinimumsLine = ({ node }) => {
  const { essence, skill, minimum } = node

  let minimums = [`Essence ${essence || 1}`]

  if (skill) {
    minimums.push(`${skill} ${minimum}`)
  }

  return (
    <div key="minimums">
      <strong>Mins: </strong>
      {minimums.join(", ")}
    </div>
  )
}

const CostLine = ({ node: { cost } }) => (
  <div key="cost">
    <strong>Cost: </strong>
    {cost || "—"}
  </div>
)

const TypeLine = ({ node: { type } }) => (
  <div key="type">
    <strong>Type: </strong>
    {type || "Simple"}
  </div>
)

const DurationLine = ({ node: { duration } }) => (
  <div key="duration">
    <strong>Duration: </strong>
    {duration || "Instant"}
  </div>
)

const KeywordLine = ({ node: { keywords } }) => (
  <div key="keywords">
    <strong>Keywords: </strong>
    {keywords ? keywords.sort().join(", ") : "None"}
  </div>
)

const PrerequisitesLine = ({ node: { charms_needed } }) =>
  charms_needed ? (
    <div key="prereqs">
      <strong>Prerequisites: </strong>
      {charms_needed.sort().join(", ")}
    </div>
  ) : null

const CharmCard = ({ node }) => {
  return (
    <div style={{ paddingTop: "1em" }} id={dashify(node.name)} css={cardClass}>
      <h2>{node.name}</h2>
      <hr />
      <div>
        <div>
          <MinimumsLine node={node} />
          <CostLine node={node} />
          <TypeLine node={node} />
          <DurationLine node={node} />
          <KeywordLine node={node} />
          <PrerequisitesLine node={node} />
        </div>
        <br />
        <hr />
        <RenderAst node={node} />
      </div>
    </div>
  )
}

export default CharmCard
