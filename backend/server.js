const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb' }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})