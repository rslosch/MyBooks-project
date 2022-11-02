import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'

const ExcerptOnlyForm = ({parentBookId}) => {

    const { books, addExcerpt } = useContext(UserContext)
    const [form, setForm] = useState({
        quote: "",
        context: "",
        page: "",
        bookId: parentBookId
    })
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id] : e.target.value
        })
        console.log("BookId",form.bookId)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("form", form)
        console.log("Event Target", e.target)
            addExcerpt(form)
            navigate(`/books/${form.bookId}`)
    }

   return (
    <form onSubmit={handleSubmit}>
        <label>Quote: </label>
        <input
            type="text"
            id="quote"
            value={form.quote}
            onChange={handleChange}
        /> <br/>
        <label>Context: </label>
        <input 
            type="text"
            id='context'
            value={form.context}
            onChange={handleChange}
        /> <br/>
        <label>Page Number: </label>
        <input 
            type="number"
            id='page'
            value={form.page}
            onChange={handleChange}
        /> <br/>
        <input type="submit"/>
    </form>
  )
}

export default ExcerptOnlyForm