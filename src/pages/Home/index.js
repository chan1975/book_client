import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalHeader ,ModalBody, ModalFooter} from 'reactstrap';
import { BsTools,BsTrashFill } from "react-icons/bs";
import {getBooks, createBook} from 'service/apiBooks'

import './style.css'

export default function Home(){
    const [books = [], setBooks] = useState({})
    const [page, setPage] = useState(1)
    const [sortColumn, setSortColumn] = useState({})
    const [showEdit, setShowEdit] = useState(false);
    const [showInsert, setShowInsert] = useState(false);
    const [idToDelete, setidToDelete] = useState()
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
        getBooks({limit:countPerPage, sortBy:sortColumn.column, page:page, direction: sortColumn.direction}).then(booksRes => {
          setBooks(booksRes)
        })
    }, [page,sortColumn])
    
    function handleSort(column, sortDirection) {
      setSortColumn({column: column.selector, direction: sortDirection})
    }
    const handleInsert = () =>{
      createBook({book: book})
        .then(response => {
          setShowInsert(!showInsert)
          setBook({})
          /*setBooks({
            totalRows : books.totalRows,
            data : books.data.concat(response)
          })*/
        })
        .catch(ex =>{
          alert(ex)
        })
      
    }
    const handleEditOpenClose = () => setShowEdit(!showEdit)
    const handleInsertOpenClose = () => setShowInsert(!showInsert)
    const handleDelete = (state) =>{ console.log(state.target.id) }
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
        sortable: true
      },
      {
        name: 'Acciones',
        cell:(row) => <button className= 'btn btn-danger' size="sm" id ={row.id} onClick={handleDelete}><BsTrashFill/></button>,
        allowOverflow: true,
        //ignoreRowClick:true,
        button: true
      }
      
    
    ]


    return(
      <div className="App-main">
        <button className='btn btn-warning'  onClick = {handleInsertOpenClose} >INSERTAR NUEVO REGISTRO</button>
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
        <Modal isOpen={showEdit}>
        <ModalHeader> Edicion de datos</ModalHeader>
          <ModalBody>
            <div className= 'form-group'>
              <label>Titulo</label>
              <br/>
              <input type ='text' className ='form-control' name = 'name' onChange = {handleChange} required ='true'/> 
              <label>Autor</label>
              <br/>
              <input type ='text' className ='form-control' name = 'auth' onChange = {handleChange} required/> 
              <label>Descripcion</label>
              <br/>
              <input type ='text' className ='form-control' name = 'description' onChange = {handleChange}  required/> 
              <label>Precio</label>
              <br/>
              <input type = 'number' value = 'price' name = 'price' onChange = {handleChange} required/> 
              <br/>
              <label>Fecha de Publicacion</label>
              <br/>
              <input type ='date' className ='form-control' name = 'publishedDate' onChange = {handleChange} required/> 
            </div>
          </ModalBody>
          <ModalFooter>
            <button className = 'btn btn-primary' onClick={handleInsertOpenClose}>Cerrar</button>
            <button className = 'btn btn-primary' onClick={handleInsert}>Save Changes</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={showInsert}>
          <ModalHeader> Ingreso de datos</ModalHeader>
          <ModalBody>
            <div className= 'form-group'>
              <label>Titulo</label>
              <br/>
              <input type ='text' className ='form-control' name = 'name' onChange = {handleChange} required ='true'/> 
              <label>Autor</label>
              <br/>
              <input type ='text' className ='form-control' name = 'auth' onChange = {handleChange} required/> 
              <label>Descripcion</label>
              <br/>
              <input type ='text' className ='form-control' name = 'description' onChange = {handleChange}  required/> 
              <label>Precio</label>
              <br/>
              <input type = 'number' value = 'price' name = 'price' onChange = {handleChange} required/> 
              <br/>
              <label>Fecha de Publicacion</label>
              <br/>
              <input type ='date' className ='form-control' name = 'publishedDate' onChange = {handleChange} required/> 
            </div>
          </ModalBody>
          <ModalFooter>
            <button className = 'btn btn-primary' onClick={handleInsertOpenClose}>Cerrar</button>
            <button className = 'btn btn-primary' onClick={handleInsert}>Save Changes</button>
          </ModalFooter>
        </Modal>
      </div>
    )
}