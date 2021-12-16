import { useState } from 'react'
import Input from '../input/input'
import Button from '../button/button'
import styles from './form.module.css'

export default function Form() {
	const [text, setText] = useState('')
	const [goal, setGoal] = useState(0)

	const submitHandler = (e) => {
		e.preventDefault()

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
			})
	}

	return (
		<div>
			<form onSubmit={submitHandler} className={styles.form}>
				<Input
					type='text'
					placeholder='Title'
					onChange={(e) => setText(e.target.value)}
				/>
				<Input
					type='number'
					placeholder='Weekly Goal'
					onChange={(e) => setGoal(e.target.value)}
				/>
				<Button>Add New</Button>
			</form>
		</div>
	)
}
