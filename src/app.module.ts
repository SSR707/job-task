import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomJwtModule } from './config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common';
import { TasksModule } from './tasks/tasks.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://localhost/job-task',
    ),
    AuthModule,
    UserModule,
    CustomJwtModule,
    TasksModule,
    CourseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
