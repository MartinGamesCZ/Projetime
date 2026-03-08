import { Module } from '@nestjs/common';
import { AppController } from './routes/app.controller';
import { AppService } from './routes/app.service';
import { ClientsModule } from './routes/clients/clients.module';
import { ProjectsModule } from './routes/projects/projects.module';

@Module({
  imports: [ClientsModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
