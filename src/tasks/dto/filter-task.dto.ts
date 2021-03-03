import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class FilterTaskDto {
    @IsOptional()
    @IsIn(Object.entries(TaskStatus).map(el=> el[1]))
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}