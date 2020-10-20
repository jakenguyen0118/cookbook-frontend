import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Link, Switch} from 'react-router-dom'
import Display from './Display'
import Form from './Form'


function App() {
  const url = "http://localhost:4000"

  const [cookbooks, setCookbooks] = useState([])

  const emptyCookbook = {
    title: "",
    yearPublished: 0
  }

  const [selectedCookbook, setSelectedCookbook] = useState(emptyCookbook)

  const getCookbooks = () => {
    fetch(url + "/api/cookbooks/")
    .then(res => res.json())
    .then(data => {
      setCookbooks(data.data)
    })
  }

  useEffect(() => {
    getCookbooks()
  }, [])

  const handleCreate = newCookbook => {
    fetch(url + '/api/cookbooks/', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCookbook)
    })
    .then(res => getCookbooks())
  }

  const handleUpdate = (cookbook) => {
    fetch(url + '/api/cookbooks/' + cookbook._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cookbook)
    })
    .then(res => getCookbooks())
  }

  const selectCookbook = cookbook => {
    setSelectedCookbook(cookbook)
  }

  const deleteCookbook = cookbook => {
    fetch(url + '/api/cookbooks/' + cookbook._id, {
      method: "delete"
    })
    .then(() => getCookbooks())
  }

  return (
		<div className='App'>
			<h1>Cookbooks</h1>
      <Link to='/create'>
        <button>Add Cookbook</button>
      </Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(routerProps) => <Display {...routerProps} cookbooks={cookbooks} selectCookbook={selectCookbook} deleteCookbook={deleteCookbook}/>}
					/>
					<Route
						exact
						path='/create'
						render={(routerProps) => (
						  <Form {...routerProps} label='create' cookbook={{emptyCookbook}} handleSubmit={handleCreate}/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(routerProps) => (
						  <Form {...routerProps} label="update" cookbook={selectedCookbook} handleSubmit={handleUpdate}/>
						)}
					/>
				</Switch>
			</main>
		</div>
	)
}

export default App;
