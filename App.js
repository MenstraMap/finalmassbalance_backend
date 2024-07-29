require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://rkbvmrcgimhrzqxmwwyi.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.use(bodyParser.json());


app.get('/inventory', async (req, res) => {
    //read data from supabase database

    try {
        const { data, error } = await supabase
            .from('sensor_data')
            .select('*');
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/inventory', async (req, res) => {
    const { value } = req.body;
    try {
        const { data, error } = await supabase
            .from('sensor_data')
            .insert([
                { value: value },
            ])
            .select()

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});