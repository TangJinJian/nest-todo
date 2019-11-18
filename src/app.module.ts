import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './feature/users/users.module';
import { AuthModule } from './feature/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './feature/todos/todos.module';

/**
 * 如果在开发模式，则从本地读取数据库认证。
 */
declare const module: any;
let MongoAuth: {
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
};
if (module.hot) {
  // tslint:disable-next-line: no-var-requires
  MongoAuth = require('./mongo-auth.json');
}

const {
  MONGO_HOST = 'localhost',
  MONGO_PORT = '27017',
  MONGO_DB = 'todo',
  MONGO_INITDB_ROOT_USERNAME = MongoAuth.MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD = MongoAuth.MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
    ),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
