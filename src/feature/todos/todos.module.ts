import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { TodoSchema } from './schemas/todo.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Todo', schema: TodoSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
