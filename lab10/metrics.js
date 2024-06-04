import express from 'express';
import {collectDefaultMetrics, Gauge, Registry} from 'prom-client';
import process from 'node:process';


const SERVER_PORT = process.env.SERVER_PORT;


const server = express();
const register = new Registry();
collectDefaultMetrics({register});


server.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        res.status(500).end('Something went wrong');
    }
});

server.listen(SERVER_PORT, async (error) => {
    if (error) process.exit(1);
    else console.log(`Web server is started on port: ${SERVER_PORT}`);

});

const wordCounter = new Gauge({
    name: 'word_number',
    help: 'number_of_words',
    registers: [register]
});

export {wordCounter};
