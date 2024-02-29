import { Module } from '@nestjs/common'
import { HttpModule, HttpService  } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import * as Joi from 'joi'

import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required()
      })
    }),
    HttpModule,
    ProductsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [
  {
    provide: 'TASKS',
    useFactory: async (http:HttpService) => {
      const request = http.get('https://jsonplaceholder.typicode.com/todos')
      const tasks = await lastValueFrom(request)
      return tasks.data
    },
    inject: [HttpService]
  }],
})
export class AppModule {}
