import React from "react"
import { cardClass } from "style/common"
import RenderAst from "lib/RenderAst"

const MinimumsLine = ({ node }) => {
  const { essence, skill, minimum } = node

  let minimums = [`Essence ${essence || 1}`]

  if (skill) {
    minimums.push(`${skill} ${minimum}`)
  }

  return (
    <div>
      <strong>Mins: </strong>
      {minimums.join(", ")}
    </div>
  )
}

const CostLine = ({ node: { cost } }) => (
  <div>
    <strong>Cost: </strong>
    {cost || "—"}
  </div>
)

const TypeLine = ({ node: { type } }) => (
  <div>
    <strong>Type: </strong>
    {type || "Simple"}
  </div>
)

const DurationLine = ({ node: { duration } }) => (
  <div>
    <strong>Duration: </strong>
    {duration || "Instant"}
  </div>
)

const KeywordLine = ({ node: { keywords } }) => (
  <div>
    <strong>Keywords: </strong>
    {keywords ? keywords.sort().join(", ") : "None"}
  </div>
)

const PrerequisitesLine = ({ node: { charms_needed } }) =>
  charms_needed ? (
    <div>
      <strong>Prerequisites: </strong>
      {charms_needed.sort().join(", ")}
    </div>
  ) : null

const CharmCard = ({ node }) => {
  return (
    <div style={{ paddingTop: "1em" }} id={node.name} className={cardClass}>
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
        <RenderAst node={node} />
      </div>
    </div>
  )
}

export default CharmCard
