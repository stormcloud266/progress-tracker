import ProgressBar from '../progressBar/progressBar'
import { useEffect, useState } from 'react'

export default function List() {
	const [items, setItems] = useState([])

	const getItems = () => {
		fetch('/api/progress')
			.then((res) => res.json())
			.then((data) => setItems(data.result))
	}

	useEffect(() => {
		getItems()
	})

	return (
		<div>
			<h1>todos</h1>

			<div>
				{items.map((item) => (
					<div key={item._id}>
						<p>{item.text}</p>
						<ProgressBar current={item.current} goal={item.goal} />
					</div>
				))}
			</div>
		</div>
	)
}
