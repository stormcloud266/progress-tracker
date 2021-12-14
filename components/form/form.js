import styles from './form.module.css'

export default function Form() {
	return (
		<div>
			<form>
				<input type='text' placeholder='Title' />
				<input type='number' placeholder='Weekly Total' />
				<button>Add New</button>
			</form>
		</div>
	)
}
