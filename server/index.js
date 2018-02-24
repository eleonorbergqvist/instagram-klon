const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/v1/images', (req, res) => {
    return res.json({ data: [1] });
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))