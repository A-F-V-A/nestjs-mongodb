import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'
import config from './config'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_CONNECTION: Joi.string().required(),
      })
    }),
    ProductsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
