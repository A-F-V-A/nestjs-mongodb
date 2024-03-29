import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product extends Document {
  @Prop({required: true})
  name: string

  @Prop()
  description: string

  @Prop({type: Number, index: true})
  price: number

  @Prop({type: Number})
  stock: number

  @Prop()
  image: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.index({price: 1, stock: -1})
