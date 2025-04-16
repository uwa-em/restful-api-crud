const express = require('express')
const mongoose = require('mongoose')
const Task = require('./models/taskModel')
const app = express()
const port = 3000

app.use(express.json())

app.get('/task', async (req, res) => {
    try {
        const task = await Task.find({});
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/task', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
    res.send(req.body)
})

app.put('/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if (!task) {
            return res.status(404).json({ message: 'cannot find' })
        }
        const updatedTask = await Task.findById(id)
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
    res.send(req.body)
})

app.delete('/task/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'cannot find' })
        }

        res.status(200).json(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
    res.send(req.body)
})

mongoose.connect('mongodb+srv://urwaemanhanif:JUNGWON.jung1@cluster0.a5rrnlz.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('connected to db')
        app.listen(3000, () => {
            console.log(`Running`)
        })
    }).catch((error) => {
        console.log(error)
    })
