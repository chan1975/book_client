import React, {useEffect, useState} from 'react'
import SearchForm from '../../components/SearchForm'
import getImages from '../../service/Images'
import './style.css'
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
          <div className="App-main">
            <div className="App-results">
              <ListOfImages images={images} />
            </div>
          </div>
        </>
    )
}