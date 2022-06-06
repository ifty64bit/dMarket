import React from 'react'

function Button(props) {

    return (
        <button className="text-white bg-black px-4 py-2 rounded-full" onClick={ props.onClick? ()=> props.onClick(props.product,props.value) : ()=>0 }>
            {props.children}
        </button>
    )
}

export default Button
