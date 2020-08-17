import React, {useEffect, useState} from 'react'
import SearchForm from '../../components/SearchForm'
import getImages from '../../service/Images'
import './Home.css'
import ListOfImages from '../../components/ListOfImages'
export default function (){
    const [images = [], setImages] = useState([])
    const [search, setSearch] = useState('')

    useEffect(function(){
        getImages({keyword: search}).then(image => {
            setImages(image)
        })  
    }, [search])

    const handleSearchValue = (value) => {
        setSearch(value)
        console.log(value)
    }

    return(
        <>
            <div className = 'SearchFrom-wrapper'>
                <SearchForm onSearchValue={handleSearchValue}/>
            </div>
            <section id='galeria'>
                <div>
                    <ListOfImages images = {images}/>
                </div>
            </section>
        </>
    )
}