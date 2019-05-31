import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './feature/users/users.module';
import { AuthModule } from './feature/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './feature/todos/todos.module';

let mongoHost: string;
if (process.env.MONGO_HOST) {
  mongoHost = process.env.MONGO_HOST;
} else {
  mongoHost = 'localhost';
}

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(`mongodb://${mongoHost}/todo`),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
