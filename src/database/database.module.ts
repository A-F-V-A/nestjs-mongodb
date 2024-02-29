import { Module, Global } from '@nestjs/common'
import { MongoClient } from 'mongodb'

@Global()
@Module({
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'NestJS'
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri = 'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary'
        const client = new MongoClient(uri)
        await client.connect()
        await client.connect()
        const database = client.db('afva-store')

        return database
      },
      inject: []
    }
  ],
  exports : ['APP_NAME','MONGO']
})
export class DatabaseModule {}
