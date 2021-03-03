import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
// import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Post()  
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Task[] {
    //     if(Object.keys(filterTaskDto).length){
    //         return this.tasksService.getTasksWithFilter(filterTaskDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskById(
    //     @Param('id') id: string,
        // @Body('status', new TaskStatusValidationPipe()) status: TaskStatus
    // ): Task {
    //     return this.tasksService.updateTaskById(id, status);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void {
    //     this.tasksService.deleteTaskById(id);
    // }
}
