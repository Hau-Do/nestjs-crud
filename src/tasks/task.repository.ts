import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilterTaskDto } from "./dto/filter-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto; 
        
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        
        return task;
    }

    getTasks = async(filterTaskDto: FilterTaskDto): Promise<Task[]> => {
        const query = this.createQueryBuilder("task");
        const { status, search } = filterTaskDto;
        if(status) {
            query.andWhere('task.status = :status', { status });
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        console.log('tasks: ', tasks);
        return tasks;
    }
}