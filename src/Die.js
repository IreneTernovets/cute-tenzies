import React from 'react'

const Die = (props) => {

    return (
        <div onClick={() => props.handleHoldChange(props.id)}>
            {!props.isHeld ? props.defaultValue : props.heldValue}
        </div >
    )
}

export default Die