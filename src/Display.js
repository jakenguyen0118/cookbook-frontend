import React from 'react'

const Display = (props) => {
	const { cookbooks } = props
	console.log('cookbooks', cookbooks)

	const loaded = () => (
		<div style={{ textAlign: 'center' }}>
			{cookbooks.map((cookbook) => (
				<article>
					<h2>{cookbook.title}</h2>
					<h4>{cookbook.yearPublished}</h4>
					<button
						onClick={() => {
							props.selectCookbook(cookbook)
							props.history.push('/edit')
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteCookbook(cookbook)
						}}>
						Delete
					</button>
				</article>
			))}
		</div>
	)

	return cookbooks.length > 0 ? loaded() : <h1>Loading...</h1>
}

export default Display
