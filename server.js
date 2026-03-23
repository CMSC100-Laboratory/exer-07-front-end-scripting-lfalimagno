import express from 'express';

// instantiate the server
const app = express();

app.use(express.static('static_files')) //serves the files in the static_files folder

app.listen(3000, () => { console.log('Server started at port 3000')} );