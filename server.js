import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 8080

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist', 'dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});