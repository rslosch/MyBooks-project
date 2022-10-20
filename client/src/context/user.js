import React, { useState, useEffect } from 'react'

//Create the context object
const UserContext = React.createContext()

//Create the context provider component
function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
            if(data.error){
                setLoggedIn(false)
            } else {
                setLoggedIn(true)
                fetchBooks()
            }
        })
    }, [])

    const fetchBooks = () => {
        fetch('/books')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBooks(data) 
        })
    }

    const addBook = (book) => {
        fetch('/books', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => {
            setBooks([...books, data])
        })
    }

    const deleteBook = (bookID) => {
        fetch(`/books/${bookID}`, {
            method: 'DELETE',
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(() => {
            const updatedBooks = books.filter(b => b.id != bookID)
            setBooks(updatedBooks)
        })
    }
    
    const login = (user) => {
        setUser(user)
        fetchBooks()
        setLoggedIn(true)
    }

    const logout = () => {
        setUser({})
        setBooks([])
        setLoggedIn(false)
    }

    const signup = (user) => {
        setUser(user)
        fetchBooks()
        setLoggedIn(true)
    }

    return (
        <UserContext.Provider value = {{user, login, logout, signup, loggedIn, books, fetchBooks, addBook, deleteBook}}>
            {children}
        </UserContext.Provider>
    )
}

//export
export { UserContext, UserProvider }