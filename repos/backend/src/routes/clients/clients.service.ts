import { Repositories } from '@/database/database';
import { ClientEntity } from '@/database/entities/Client';
import { CreateClientDto } from '@/dto/clients/create.dto';
import { UpdateClientDto } from '@/dto/clients/update.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';

@Injectable()
export class ClientsService {
  async list() {
    const clients = await Repositories.clients.find();

    return clients;
  }

  async get(id: string) {
    const client = await this.#getClientById(id);
    if (!client) throw new NotFoundException('Client not found');

    return client;
  }

  async create(body: CreateClientDto) {
    const client = new ClientEntity();

    client.id = randomUUID();
    client.name = body.name;

    await Repositories.clients.save(client);

    return client;
  }

  async update(id: string, data: UpdateClientDto) {
    const client = await this.#getClientById(id);
    if (!client) throw new NotFoundException('Client not found');

    client.name = data.name;

    await Repositories.clients.save(client);

    return client;
  }

  async delete(id: string) {
    const client = await this.#getClientById(id);
    if (!client) throw new NotFoundException('Client not found');

    await Repositories.clients.softRemove(client);

    return client;
  }

  async #getClientById(id: string) {
    if (!isUUID(id)) return null;

    const client = await Repositories.clients.findOne({
      where: {
        id: id,
      },
    });
    if (!client) return null;

    return client;
  }
}
