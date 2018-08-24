import React from "react"
import { css } from "emotion";

let attuneStyle = css`
  & > strong {
    color: green;
  }
`
let hearthstoneStyle = css`
  & > strong {
    color: blue;
  }
`

const Attunement = ({ cost, slots }) => {
  let toDisplay = []
  toDisplay.push(
    <div className={attuneStyle} key="attunement">
      <strong>Attunement: </strong> {cost || "none"}
    </div>
  )

  if (slots) {
    toDisplay.push(
      <div className={hearthstoneStyle} key="hearthstones">
        <strong>Hearthstone Slots:</strong> {slots}
      </div>
    )
  }

  return <div>{toDisplay}</div>

}

export default Attunement
