import React, {useState} from 'react'

const Form = (props) => {
    const [formData, setFormData] = useState(props.cookbook)

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(formData)
        props.history.push('/')
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
            />
            <input
                type='text'
                name='yearPublished'
                value={formData.yearPublished}
                onChange={handleChange}
            />
            <input type='submit' value={props.label} />
        </form>
    )
}

export default Form