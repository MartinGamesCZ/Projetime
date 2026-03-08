import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from '@/dto/projects/create.dto';
import { UpdateProjectDto } from '@/dto/projects/update.dto';
import { ApiVersion } from '@/types/ApiVersion';

@Controller({
  path: '/projects',
  version: ApiVersion.v1,
})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async list() {
    return await this.projectsService.list();
  }

  @Get('/:projectId')
  async get(@Param('projectId') projectId: string) {
    return await this.projectsService.get(projectId);
  }

  @Post()
  async create(@Body() body: CreateProjectDto) {
    return await this.projectsService.create(body);
  }

  @Put('/:projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
  ) {
    return await this.projectsService.update(projectId, body);
  }

  @Delete('/:projectId')
  async delete(@Param('projectId') projectId: string) {
    return await this.projectsService.delete(projectId);
  }
}
