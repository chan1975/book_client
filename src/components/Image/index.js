import React from 'react'
import './Image.css'
import {Link} from 'wouter'
export default function({id, user, url}){
    console.log(this)
    return(
        <Link to={`/detail/${id}`}>
            <figure>
                <img src={url} alt={user}/>
                <small>{user}</small>
            </figure>
        </Link>
    )
}