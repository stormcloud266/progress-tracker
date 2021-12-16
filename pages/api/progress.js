import { MongoClient, ObjectId } from 'mongodb'

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.petvr.mongodb.net/progress?retryWrites=true&w=majority`
	)
	return client
}

export default async function handler(req, res) {
	let client

	try {
		client = await connectDatabase()
	} catch (error) {
		res.status(500).json({ message: 'Could not connect to database.' })
		return
	}

	const db = client.db()

	if (req.method === 'GET') {
		const result = await db.collection('todos').find({}).toArray()
		res.status(200).json({ message: 'Got items', result })
	}

	if (req.method === 'POST') {
		const { text, goal } = req.body

		const data = {
			text,
			current: 0,
			goal,
		}

		try {
			const result = await db.collection('todos').insertOne(data)
			data.id = result.insertedId
		} catch (error) {
			client.close()
			res.status(500).json({ message: 'Could not connect to database.' })
			return
		}
		res.status(201).json({ message: 'Added new item', data })
	}

	if (req.method === 'PUT') {
		const { _id, text, current, goal } = req.body
		let result
		if (text) {
			result = await db.collection('todos').updateOne(
				{
					_id: ObjectId(_id),
				},
				{
					$set: {
						text,
						current,
						goal,
					},
				}
			)
		} else {
			result = await db.collection('todos').updateOne(
				{
					_id: ObjectId(_id),
				},
				{
					$set: {
						current,
					},
				}
			)
		}

		res.status(200).json({ message: 'Updated item', result })
	}

	if (req.method === 'DELETE') {
		console.log('fe')
		const result = await db.collection('todos').deleteOne({
			_id: ObjectId(req.body._id),
		})
		res.status(200).json({ message: 'Deleted item', result })
	}

	client.close()
}
