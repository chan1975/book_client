

export default function getBooks(){
    
    const apiUrl = `http://localhost:8080/books`

    return fetch(apiUrl)
        .then(res => res.json())
        .then(response => {
            console.log(response)
        })
}