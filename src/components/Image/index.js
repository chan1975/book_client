import React from 'react'
import './style.css'
import {Link} from 'wouter'
export default function({id, user, url}){
    console.log(this)
    return(
      <div className="Image">
        <Link to={`/detail/${id}`}>
            <figure>
                <img src={url} alt={user}/>
                <small>{user}</small>
            </figure>
        </Link>
      </div>
    )
}