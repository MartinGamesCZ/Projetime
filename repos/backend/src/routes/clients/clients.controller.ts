import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from '@/dto/clients/create.dto';
import { UpdateClientDto } from '@/dto/clients/update.dto';
import { ApiVersion } from '@/types/ApiVersion';

@Controller({
  path: '/clients',
  version: ApiVersion.v1,
})
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async list() {
    return await this.clientsService.list();
  }

  @Get('/:clientId')
  async get(@Param('clientId') clientId: string) {
    return await this.clientsService.get(clientId);
  }

  @Post()
  async create(@Body() body: CreateClientDto) {
    return await this.clientsService.create(body);
  }

  @Put('/:clientId')
  async update(
    @Param('clientId') clientId: string,
    @Body() body: UpdateClientDto,
  ) {
    return await this.clientsService.update(clientId, body);
  }

  @Delete('/:clientId')
  async delete(@Param('clientId') cliendId: string) {
    return await this.clientsService.delete(cliendId);
  }
}
