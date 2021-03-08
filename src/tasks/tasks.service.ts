import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Task } from './task.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    getTasks = (filterTaskDto: FilterTaskDto): Promise<Task[]> => {
        return this.taskRepository.getTasks(filterTaskDto);
    }
    
    async getTaskById(id: number): Promise<Task> {
        const result = await this.taskRepository.findOne(id);
        if(!result){
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return result;
    }

    async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        const result = await this.taskRepository.save(task); //or task.save()
        return result;
    }

    async deleteTaskById(id: number): Promise<void>{
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
}
