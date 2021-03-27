const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'docs')));

app.listen(PORT, () => {
    console.log(`Server up & running at port ${PORT}`);
});