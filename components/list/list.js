import ProgressBar from '../progressBar/progressBar'
import { data } from '../../data'

export default function List() {
	return (
		<div>
			<h1>todos</h1>

			<div>
				{data.map((item) => (
					<div key={item.title}>
						<p>{item.title}</p>
						<ProgressBar current={item.current} goal={item.goal} />
					</div>
				))}
			</div>
		</div>
	)
}
