import { Module, Global } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongoClient } from 'mongodb'
import config from '../config'

@Global()
@Module({
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'NestJS'
    },
    {
      provide: 'MONGO',
      useFactory: async (configService:ConfigType<typeof config>) => {
        const {
          user,
          password,
          host,
          port,
          name,
          connection
        } = configService.mongo

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db(name)

        return database
      },
      inject: [config.KEY]
    }
  ],
  exports : ['APP_NAME','MONGO']
})
export class DatabaseModule {}
