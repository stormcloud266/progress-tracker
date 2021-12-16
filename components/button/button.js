import styles from './button.module.css'

export default function Input({ children, ...rest }) {
	return (
		<button className={styles.button} {...rest}>
			{children}
		</button>
	)
}
