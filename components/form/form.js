import { useState } from 'react'
import Input from '../input/input'
import Button from '../button/button'
import styles from './form.module.css'

export default function Form({ items, setItems }) {
	const [text, setText] = useState('')
	const [goal, setGoal] = useState(0)

	const submitHandler = (e) => {
		e.preventDefault()
		const tempId = Date.now().toString()

		setItems((prevState) => [
			...prevState,
			{
				_id: tempId,
				text,
				goal,
				current: 0,
				disabled: true,
			},
		])

		fetch('/api/progress', {
			method: 'POST',
			body: JSON.stringify({
				text,
				goal,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setText('')
				setGoal(0)

				setItems((prevState) =>
					prevState.map((item) => {
						if (item._id === tempId) {
							return data.result
						} else {
							return item
						}
					})
				)
			})
	}

	return (
		<div>
			<form onSubmit={submitHandler} className={styles.form}>
				<Input
					type='text'
					placeholder='Title'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Input
					type='number'
					placeholder='Weekly Goal'
					value={goal}
					onChange={(e) => setGoal(e.target.value)}
				/>
				<Button>Add New</Button>
			</form>
		</div>
	)
}
