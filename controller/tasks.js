const {v4} = require('uuid')
const { read_file, write_file } = require('../fs/filesystem.js'); 

// GET ALL TASKS

const getAllTasks = async (req, res) => {
  try {
    const task = read_file("tasks.json");
    res.status(200).json(task);
  } catch (error) {
    console.error(error.message);
  }
};

// GET ONE

const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const cars = read_file("tasks.json");

    const foundedCar = cars.find((item) => item.id === id);

    if (!foundedCar) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(foundedCar);
  } catch (error) {
    console.error(error.message);
  }
};

// ADD TASK

const addTask = async (req, res) => {
  try {
    const { title} = req.body;
    const cars = read_file("tasks.json");

    cars.push({
      id: v4(),
      title,
      createById: req.user.id
    });

    write_file("tasks.json", cars);
    res.status(201).json({
      message: "Task added",
    });
  } catch (error) {
    console.error(error.message);
  }
};

// UPDATE

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title} = req.body;
    const cars = read_file("tasks.json");

    const foundedCar = cars.find((item) => item.id === id);

    if (!foundedCar) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (foundedCar.createById !== req.user.id) {
      return res.status(400).json({message: "You are not owner this task"})
    }

    cars.forEach((element) => {
      if (element.id === id) {
        element.title = title ? title : element.title;
      }
    });

    write_file("tasks.json", cars);
    res.status(201).json({
      message: "Task updated",
    });
  } catch (error) {
    console.error(error.message);
  }
};

// DELETE

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const cars = read_file("tasks.json");

    const foundedCar = cars.find((item) => item.id === id);

    if (!foundedCar) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (foundedCar.createById !== req.user.id) {
      return res.status(400).json({message: "you are not owner ths task"})
    }

    cars.forEach((item, index) => {
      if (item.id === id) {
        cars.splice(index, 1);
      }
    });

    write_file("tasks.json", cars);
    res.status(201).json({
      message: "Task deleted🗑️",
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  updateTask,
  deleteTask
}