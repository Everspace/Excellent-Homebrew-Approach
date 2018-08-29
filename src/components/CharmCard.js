import React from "react"
import { pageContentClass, cardClass } from "style/common"
import Ast from "lib/Ast"

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

const CharmCard = ({ node }) => {
  let {
    // Artifacts
    essence,
    type,
    duration,
    cost,
    charms_needed,
    keywords,
    // Splat only
    skill,
  } = node

  return (
    <div style={{ paddingTop: "1em" }} id={node.name} className={cardClass}>
      <h2>{node.name}</h2>
      <hr />
      <div>
        <MinimumsLine node={node} />
        <div>
          <strong>Cost: </strong>
          {node.cost || "—"}
        </div>
        <div>
          <strong>Type: </strong>
          {type || "Simple"}
        </div>
        <div>
          <strong>Duration: </strong>
          {duration || "Instant"}
        </div>
        <div>
          <strong>Keywords: </strong>
          {keywords ? keywords.sort().join(", ") : "None"}
        </div>
        {charms_needed ? (
          <div>
            <strong>Prerequisites: </strong>
            {charms_needed.sort().join(", ")}
          </div>
        ) : null}
        <br />
        <Ast
          className={pageContentClass}
          ast={node.parent.htmlAst}
          node={node}
        />
      </div>
    </div>
  )
}

export default CharmCard
