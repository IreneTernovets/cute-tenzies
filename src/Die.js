import React from 'react'

const Die = (props) => {
    console.log(props.isHeld)
    return (
        < div className='svg-wrapper' >
            {!props.isHeld ? props.defaultValue : props.heldValue}
        </div >
    )
}

export default Die