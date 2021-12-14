export default async function handler(req, res) {
	if (req.method === 'Get') {
		res.status(200).json({ message: 'Got items' })
	}

	if (req.method === 'POST') {
		res.status(201).json({ message: 'Added new item' })
	}

	if (req.method === 'PUT') {
		res.status(204).json({ message: 'Updated item' })
	}

	if (req.method === 'DELETE') {
		res.status(200).json({ message: 'Deleted item' })
	}
}
