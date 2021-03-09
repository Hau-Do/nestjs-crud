import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()  
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterTaskDto: FilterTaskDto): Promise<Task[]> {
       return this.tasksService.getTasks(filterTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', new TaskStatusValidationPipe()) status: TaskStatus
    ): Promise<Task> {
        return this.tasksService.updateTaskById(id, status);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): void {
        this.tasksService.deleteTaskById(id);
    }
}
