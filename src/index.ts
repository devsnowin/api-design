import app from './server';
import * as dotenv from 'dotenv';

dotenv.config();

app.listen(3000, () => console.log('Server start at http://localhost:3000'));
