import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-auth', {
      dbName: 'nest-auth',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }),
    AuthModule
  ],

  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
