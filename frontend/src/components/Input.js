import React from 'react'

export const Input = (props) => {
    
    return (
        <div>
            <input
                name= {props.name}
                className = {(props.error !== '' && props.error !== undefined) ? 'form-control is-invalid' : 'form-control'}
                type= {props.type}
                placeholder = {props.placeholder}
                value = {props.value}
                onChange = {props.onChange}
                disabled = {props.disabled}
            />
            {(props.error !== '' && props.error !== undefined) && <label className = "text-danger text-small d-block mb-2"> {props.error} </label>}
        </div>
    )
}
