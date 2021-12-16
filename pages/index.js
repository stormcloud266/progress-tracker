import Head from 'next/head'
import List from '../components/list/list'
import Form from '../components/form/form'
import Container from '../components/container/container'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Container>
				<Form />
				<List />
			</Container>
		</div>
	)
}
