const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter task title']
        },
        description: {
            type: String,
            required: [true, 'Please enter task description']
        },
        dueDate: {
            type: Date,
            required: false
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
