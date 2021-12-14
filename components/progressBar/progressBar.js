import { useEffect, useState } from 'react'
import styles from './progressBar.module.css'

export default function ProgressBar({ current, goal }) {
	const [width, setWidth] = useState(0)
	console.log('width: ', width)

	useEffect(() => {
		setWidth(current / goal)
	}, [current, goal])

	return (
		<div className={styles.container}>
			<p className={styles.current}>{current}</p>
			<div className={styles.barContainer}>
				<div className={styles.bar} style={{ width: width * 100 + '%' }} />
			</div>
			<p className={styles.goal}>{goal}</p>
		</div>
	)
}
