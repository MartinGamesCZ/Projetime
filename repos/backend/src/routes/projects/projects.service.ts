import { Repositories } from '@/database/database';
import { ProjectEntity } from '@/database/entities/Project';
import { CreateProjectDto } from '@/dto/projects/create.dto';
import { UpdateProjectDto } from '@/dto/projects/update.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';

@Injectable()
export class ProjectsService {
  async list() {
    const projects = await Repositories.projects.find({
      relations: ['client'],
    });

    return projects;
  }

  async get(projectId: string) {
    const project = await this.#getProjectById(projectId);

    return project;
  }

  async create(data: CreateProjectDto) {
    const client = await this.#getClientById(data.clientId);

    const project = new ProjectEntity();

    project.id = randomUUID();
    project.name = data.name;
    project.rate = data.rate;
    project.client = client;

    await Repositories.projects.save(project);

    return project;
  }

  async update(projectId: string, data: UpdateProjectDto) {
    const project = await this.#getProjectById(projectId);

    if (data.name) project.name = data.name;
    if (data.rate) project.rate = data.rate;
    if (data.clientId)
      project.client = await this.#getClientById(project.client.id);

    await Repositories.projects.save(project);

    return project;
  }

  async delete(projectId: string) {
    const project = await this.#getProjectById(projectId);

    await Repositories.projects.softRemove(project);

    return project;
  }

  async #getClientById(id: string) {
    if (!isUUID(id)) throw new NotFoundException('Client not found');

    const client = await Repositories.clients.findOne({
      where: {
        id: id,
      },
    });
    if (!client) throw new NotFoundException('Client not found');

    return client;
  }

  async #getProjectById(id: string) {
    if (!isUUID(id)) throw new NotFoundException('Project not found');

    const project = await Repositories.projects.findOne({
      where: {
        id: id,
      },
      relations: ['client'],
    });
    if (!project) throw new NotFoundException('Project not found');

    return project;
  }
}
