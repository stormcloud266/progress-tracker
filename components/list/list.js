import ProgressBar from '../progressBar/progressBar'
import Input from '../input/input'
import Button from '../button/button'
import { useState } from 'react'

export default function List({ items, setItems }) {
	const [isEditing, setIsEditing] = useState(false)

	const [id, setId] = useState('')
	const [text, setText] = useState('')
	const [current, setCurrent] = useState('')
	const [goal, setGoal] = useState('')

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
		setItems(items.filter((item) => item._id !== id))
		setIsEditing(false)

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
							{item.text}{' '}
							<button
								disabled={item.disabled ? true : false}
								onClick={() => openEditor(item)}
							>
								edit
							</button>
						</p>
						<ProgressBar
							current={item.current}
							goal={item.goal}
							disabled={item.disabled ? true : false}
						/>
					</div>
				))}
			</div>
			{isEditing && (
				<div>
					<Button onClick={() => setIsEditing(false)}>close</Button>
					<Button onClick={handleDelete}>delete</Button>
					<form onSubmit={(e) => handleSubmit(e)}>
						<Input
							type='text'
							placeholder='title'
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<Input
							type='number'
							placeholder='current'
							value={current}
							onChange={(e) => setCurrent(e.target.value)}
							step='.5'
						/>
						<Input
							type='number'
							placeholder='weekly goal'
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
							step='.5'
						/>
						<Button>submit</Button>
					</form>
				</div>
			)}
		</div>
	)
}
