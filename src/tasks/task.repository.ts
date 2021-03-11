import { InternalServerErrorException, Logger } from "@nestjs/common";
import e from "express";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilterTaskDto } from "./dto/filter-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto; 
        
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch(error){
            this.logger.error(`Failed to create a task for user "${user.username}". Data: ${JSON.stringify(createTaskDto)}`, error.stack)
        }
        delete task.user
        
        return task;
    }

    getTasks = async(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> => {
        const query = this.createQueryBuilder("task");
        const { status, search } = filterTaskDto;
        const { id: userId } = user;
        query.where('task.userId111 = :userId', { userId });
        if(status) {
            query.andWhere('task.status = :status', { status });
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        try{
            const tasks = await query.getMany();
            return tasks;
        } catch(error){
            this.logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterTaskDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}