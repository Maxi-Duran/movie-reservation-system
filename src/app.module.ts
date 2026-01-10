import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'myapp_dev',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    UserModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
