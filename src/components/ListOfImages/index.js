import React from 'react'
import Image from '../Image'
export default function({images = []}){
    console.log(images)
    return(
        images.map(image => 
            <Image 
                key={image.id}
                id = {image.id} 
                user={image.user} 
                url={image.url} 
            />
        )
    )
}