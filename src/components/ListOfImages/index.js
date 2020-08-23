import React from 'react'
import Image from '../Image'
import './style.css'
export default function ListOfImages({images = []}){
    
    return(
      <div className= "ListOfImages">
        {
            images.map(image => 
               <Image 
                  key={image.id}
                  id = {image.id} 
                  user={image.user} 
                  url={image.url} 
               />
            )
        }
      </div> 
    )
}