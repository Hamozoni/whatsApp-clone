const server = require('express');


const app = server();

const PORT = 500;

app.listen(PORT,()=> {

    console.log('app is running on port 500')
})