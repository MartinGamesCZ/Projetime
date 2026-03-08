import { Module } from '@nestjs/common';
import { AppController } from './routes/app.controller';
import { AppService } from './routes/app.service';
import { ClientsModule } from './routes/clients/clients.module';

@Module({
  imports: [ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
