const express = require('express')
const app = express()
const PORT = 3000

// Middleware 
app.use(express.json())


// Dummy Json data
const books = [
    {
        id : "1",
        title : "book 1"
    },
    {
        id : "2",
        title : "book 2"
    }
]

// intro home page route
app.get('/', (req,res)=>{
    res.json({
        message: "Welcome to our bookStore API"
    })
})

// Route for All books
app.get('/books', (req,res)=>{
    res.json(books)
})

// Route for a Single book
app.get("/books/:id", (req,res)=>{
    const book = books.find((item) => item.id === req.params.id);
    // console.log(book , 35)
    if(book){
        res.status(200).json(book)
    } else {
        res.status(404).json({
            message: "not able to find that book"
        })
    }
})

// Route for adding a new book
app.post('/add', (req,res)=>{
    const {id , title} = req.body
    if (!id || !title) {
        return res.status(400).json({ message: "ID and Title are required" });
      }
    const newbook = {id, title}
    books.push(newbook)

    res.status(201).json({
        data : newbook,
        message : "New Book Added"
    })
})

// ---For genrating random id and title
// const newBook = {
//     id: Math.floor(Math.random() * 1000).toString(),
//     title: `Book ${Math.floor(Math.random() * 1000)}`,
//   };

// Route for Updating a book
app.put('/update/:id', (req,res)=>{
    const {id} = req.params
    const {title} = req.body

    const book = books.find((item)=>item.id === id)

    if(!book){
        res.status(204).json({
            message: "For this Id book is not there !"
        })
    }

    book.title = title

    res.status(200).json({
        data: book,
        message: 'Book updated Succesfully !'
    })  
})

// Route for deleting a book
app.delete('/delete/:id', (req,res)=>{
    const { id } = req.params

    const bookIndex = books.find((item)=> item.id === id)

    if(bookIndex == -1){
        return res.status(400).json({
            message : "Book Not Found"
        })
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    res.status(200).json({
        data : deletedBook,
        message : "book deleted successfully"
    })
})
 

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})




