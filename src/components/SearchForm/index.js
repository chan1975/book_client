import React, {useState} from 'react'

export default function SearchForm (){
    
    const [inputImages, setInputImages] = useState('')

    const handleChange = (e) => {
        console.log(e.target.value)
        setInputImages(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        
        alert(inputImages)
    } 
    return (
        <form onSubmit={handleSubmit}>
            <div className="field has-addons">
                <div className="control">
                    <input 
                        onChange={handleChange}
                        className="input" 
                        type="text" 
                        placeholder="Buscar servicios"
                        value= {inputImages}
                    />
                </div>
                <div className="control">
                    <button className="button is-info">
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    )
}