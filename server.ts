import { app } from './app';
import 'dotenv/config'; 

const port = process.env.PORT;

app.listen(port, () =>
	console.log(`Server listening on http://localhost:${port}`)
)
