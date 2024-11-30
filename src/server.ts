import app from './app';  
import dotenv from 'dotenv';  
dotenv.config();  
console.log('DB_HOST:', process.env.DB_HOST);
const port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
