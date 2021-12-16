import { useEffect, useState } from 'react'
import styles from './progressBar.module.css'

export default function ProgressBar({ current, goal }) {
	const [width, setWidth] = useState(0)
	const [updatedCurrent, setUpdatedCurrent] = useState(current)

	useEffect(() => {
		setWidth(parseFloat(updatedCurrent) / parseFloat(goal))
	}, [updatedCurrent, goal])

	const handleClick = () => {
		setUpdatedCurrent(parseFloat(updatedCurrent) + 0.5)
	}

	// TODO 2 second delay before sending
	// https://usehooks.com/useDebounce/
	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/api/progress', {
			method: 'PUT',
			body: JSON.stringify({
				_id: id,
				current,
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
		<div className={styles.container}>
			<p className={styles.current}>
				<button onClick={handleClick}>+</button>
				{updatedCurrent}
			</p>
			<div className={styles.barContainer}>
				<div className={styles.bar} style={{ width: width * 100 + '%' }} />
			</div>
			<p className={styles.goal}>{goal}</p>
		</div>
	)
}
