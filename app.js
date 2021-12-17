const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));

app.use('/api/v1', require('./routes/api.js'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log('##ERROR: ', e.message);
        process.exit(1);
    }
}

start();