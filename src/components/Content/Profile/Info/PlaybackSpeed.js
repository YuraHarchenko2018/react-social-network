import React from "react"

const PlayBackSpeed = (props) => {
    let playBackSpeed = props.speed ?? 1.5
    let minutes = props.minutes ?? 22
    let seconds = props.seconds ?? 45
    let timeInSecond = minutes * 60 + seconds
    let restSeconds = ((timeInSecond/playBackSpeed) % 60).toFixed(0)
    let funcResult = ((timeInSecond/playBackSpeed) / 60).toFixed(0) + ":" + restSeconds

    return (
        <>Playback Speed: x{playBackSpeed} to {minutes}:{seconds} = {funcResult}</>
    )
}

export default PlayBackSpeed