
const apikey = '17919601-3b6b1028e3944d68c86c6fd68'
export default function getImages({keyword = 'panda'}){
    
    const apiUrl = `https://pixabay.com/api/?key=${apikey}&q=${keyword}`

    return fetch(apiUrl)
        .then(res => res.json())
        .then(response => {
            const {hits = []} = response
            const images = hits.map(image => {
                const {id, user, webformatURL } = image
                const url = webformatURL
                return {id, user, url }
            })
            return images
        })
}