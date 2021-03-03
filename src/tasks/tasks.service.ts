import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task } from './task.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    // private tasks: Task[]  = [];

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto; 
    //     const task : Task = {
    //         id: v4(),
    //         title,
    //         description,
            // status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // getTasksWithFilter(filterTaskDto: FilterTaskDto): Task[] {
    //     const { status, search } = filterTaskDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search){
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }
    //     return tasks;
    // }

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }
    
    // getTaskById(id: string): Task {
    //     const result = this.tasks.find(task => task.id === id);
    //     if(!result){
    //         throw new NotFoundException(`Task with id ${id} not found`);
    //     }
    //     return result;
    // }

    // updateTaskById(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // deleteTaskById(id: string) {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }
}
