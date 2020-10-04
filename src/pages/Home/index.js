import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';

import getBooks from 'service/Books'

import './style.css'

export default function Home(){
    const [images = [], setImages] = useState([])
    const [search, setSearch] = useState('')

    useEffect(function(){
        getBooks()
    }, [])


    return(
      <div className="App-main">
        <div className="App-results">
          <h1>Datos de la tabla</h1>
          <DataTable
            title = 'Books'
        
          />
        </div>
      </div>
    )
}