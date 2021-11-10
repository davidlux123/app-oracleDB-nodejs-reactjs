import React from 'react'
import { Link } from 'react-router-dom'

export const Lista = (props) => {

    return (
        <div>
            <h5 style = {{textAlign : 'center'}} >{props.title}</h5>
            
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        {props.header.map(head => <th key = {head} scope="col">{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.body.map(element =>
                        <tr key = {element.id}>
                            {props.header.map(head =>
                                <td key = {head}>{element[head]} </td>
                            )}
                            {
                                props.updatepage!== undefined &&  props.actionDelete !== undefined &&
                                <td>
                                    <Link className="btn btn-primary" to ={{pathname : props.updatepage, state:element}}>
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button className="btn btn-primary" style = {{margin: '6px'}} onClick = {(e)=>{props.actionDelete(e, element)}}>
                                        <i className="bi bi-trash"></i>
                                    </button>   
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
