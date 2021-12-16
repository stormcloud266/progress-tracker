import ProgressBar from '../progressBar/progressBar'
import { useEffect, useState } from 'react'

export default function List() {
	const [items, setItems] = useState([])
	const [isEditing, setIsEditing] = useState(false)

	const [id, setId] = useState('')
	const [text, setText] = useState('')
	const [current, setCurrent] = useState('')
	const [goal, setGoal] = useState('')

	// TODO hoist it
	useEffect(() => {
		console.log('updates')
		fetch('/api/progress')
			.then((res) => res.json())
			.then((data) => setItems(data.result))
	}, [])

	const openEditor = (item) => {
		setIsEditing(true)
		setId(item._id)
		setText(item.text)
		setCurrent(item.current)
		setGoal(item.goal)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/api/progress', {
			method: 'PUT',
			body: JSON.stringify({
				_id: id,
				text,
				current,
				goal,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('data: ', data)
				setIsEditing(false)
			})
	}

	const handleDelete = () => {
		fetch('/api/progress', {
			method: 'DELETE',
			body: JSON.stringify({
				_id: id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('data: ', data)
			})
	}

	return (
		<div>
			<h1>todos</h1>

			<div>
				{items.map((item) => (
					<div key={item._id}>
						<p>
							{item.text} <button onClick={() => openEditor(item)}>edit</button>
						</p>
						<ProgressBar current={item.current} goal={item.goal} />
					</div>
				))}
			</div>
			{isEditing && (
				<div>
					<button onClick={() => setIsEditing(false)}>close</button>
					<button onClick={handleDelete}>delete</button>
					<form onSubmit={(e) => handleSubmit(e)}>
						<input
							type='text'
							placeholder='title'
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<input
							type='number'
							placeholder='current'
							value={current}
							onChange={(e) => setCurrent(e.target.value)}
							step='.5'
						/>
						<input
							type='number'
							placeholder='weekly goal'
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
							step='.5'
						/>
						<button>submit</button>
					</form>
				</div>
			)}
		</div>
	)
}
