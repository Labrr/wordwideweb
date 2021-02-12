import React from 'react'

export default function SpeakOrWrite(props) {
    console.log("speakorwrite")
    return (
        <div>
            <h1 key={props.word}>{props.word} </h1>
        </div>
    )
}
