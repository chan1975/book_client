import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalHeader ,ModalBody, ModalFooter} from 'reactstrap';
import { BsTools,BsTrashFill } from "react-icons/bs";
import {getBooks, createOrUpdateBook,deleteBook} from 'service/apiBooks'
import Moment from 'moment';

import './style.css'

export default function Home(){
    const [books = [], setBooks] = useState({})
    const [mode , setMode] = useState('')
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [book, setBook] = useState({
      id: '',
      name: '',
      auth: '',
      description: '',
      price : 0,
      publishedDate: ''
    })
    const countPerPage = 4;

    useEffect(function(){
      console.log(page)
        getBooks({limit:countPerPage, sortBy:sortColumn.column, page:page, direction: sortColumn.direction}).then(booksRes => {
          setBooks(booksRes)
        })
    }, [page,sortColumn,refresh])
    
    function handleSort(column, sortDirection) {
      setSortColumn({column: column.selector, direction: sortDirection})
    }
    const handleInsert = () =>{
      setMode('Insertar registro')
      setBook({
        id: '',
        name: '',
        auth: '',
        description: '',
        price : 0,
        publishedDate: ''})
      handleOpenClose()
    }
    const handleSave = () =>{
      createOrUpdateBook({book: book})
        .then(() => {
          setShowModal(!showModal)
          setRefresh(!refresh)
        })
        .catch(ex =>{
          alert(ex)
        })
      
    }

    function handleOpenClose () {setShowModal(!showModal)}

    function handleEdit  (row) {
      setBook({
        id: row.id,
        name: row.name,
        description: row.description,
        auth: row.auth,
        price: row.price,
        publishedDate: row.publishedDate
      })
      setMode('Editar registro')
      handleOpenClose()
      
    }
    
    function handleDelete (id) { 
      deleteBook({id:id})
      setRefresh(!refresh)
    }

    const handleChange = e => {
      if(e.target != null){
        const { name , value } = e.target
        setBook({
          ...book, [name]:value
        })
      } else {
        console.log(e)
      }
      
    }


    const columns =[
      {
        name: 'ID',
        selector: 'id',
        sortable: true
      },
      {
        name: 'Titulo',
        selector: 'name',
        sortable: true
      },
      {
        name: 'Autor',
        selector: 'auth',
        sortable: true
      },
      {
        name: 'Descripcion',
        selector: 'description',
        sortable: true
      },
      {
        name: 'Precio',
        selector: 'price',
        sortable: true
      },
      {
        name: 'Fecha de publicacion',
        selector: 'publishedDate',
        sortable: true,
        format: row => Moment(row.publishedDate).format('l')
      },
      {
        name: 'Acciones',
        cell:(row) => <div>
                        <button className= 'btn btn-primary' size="sm" onClick={handleEdit.bind(this, row)}><BsTools/></button>
                        <button className= 'btn btn-danger' size="sm" onClick={handleDelete.bind(this, row.id)}><BsTrashFill/></button>
                      </div>,
        allowOverflow: true,
        //ignoreRowClick:true,
        button: true
      }
      
    
    ]


    return(
      <div className="App-main">
        <button className='btn btn-warning'  onClick = {handleInsert} >INSERTAR NUEVO REGISTRO</button>
        <div className="App-results table-responsive">
          <DataTable
            title = 'Books'
            columns = {columns}
            data = {books.data}
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={books.totalRows}
            paginationPerPage={countPerPage}
            paginationComponentOptions={{
              noRowsPerPage: true
            }}
            onChangePage={page => setPage(page)}
            onSort ={handleSort}
            responsive
          />
        </div>
        <Modal isOpen={showModal}>
        <ModalHeader> {mode}</ModalHeader>
          <ModalBody>
            <div className= 'form-group'>
              <label>Titulo</label>
              <br/>
              <input type ='text' value={book.name} className ='form-control' name = 'name' onChange = {handleChange} required ='true'/> 
              <label>Autor</label>
              <br/>
              <input type ='text' value={book.auth} className ='form-control' name = 'auth' onChange = {handleChange} required/> 
              <label>Descripcion</label>
              <br/>
              <input type ='text' value={book.description} className ='form-control' name = 'description' onChange = {handleChange}  required/> 
              <label>Precio</label>
              <br/>
              <input type = 'number' value={book.price} className ='form-control' name = 'price' onChange = {handleChange} required/> 
              <br/>
              <label>Fecha de Publicacion</label>
              <br/>
              <input type ='date' value={book.publishedDate.substr(0,10)} className ='form-control' name = 'publishedDate' onChange = {handleChange} required/> 
            </div>
          </ModalBody>
          <ModalFooter>
            <button className = 'btn btn-primary' onClick={handleOpenClose}>Cerrar</button>
            <button className = 'btn btn-primary' onClick={handleSave}>Save Changes</button>
          </ModalFooter>
        </Modal>
      </div>
    )
}