const express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());

const books = [
    {title: "Harry Potter", id: 1},
    {title: "Lord of the Rings", id: 2},
    {title: "Twilight", id: 3}
]

//READ request Handlers
app.get('/', (req,res) => {
    res.send('Welcome to the API');
});

//get all the books 
app.get('/api/books', (req,res)=> {
    res.send(books);
});

//get one book
app.get('/api/books/:id', (req,res)=> {
    const book = books.find(c => c.id === parseInt(req.params.id));

    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(book);

    });

//CREATE request handler
app.post('/api/books' ,(req,res) => {

    const { error } = validateBook(req.body);
    if (error){
    res.status(400).send(error.details[0].message)
    return;
}
    const book = {
        id: books.length + 1,
        title: req.body.title
    };
    books.push(book);
    res.send(book);
});

//UPDATE request handler
app.put('/books/:id', (req,res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = validateBook(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    return;
    }

    book.title = req.body.title;
    res.send(book);
});

// DELETE Request Handler
app.delete('/books/:id', (req,res)=> {
    const book = books.find( c=> c.id === parseInt(req.params.id));
if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

const index = books.indexOf(book);
books.splice(index,1);

res.send(books);
});


















