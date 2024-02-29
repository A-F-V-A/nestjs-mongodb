import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '../entities/products.entity'
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto'

@Injectable()
export class ProductsService {
  private counterId = 5
  private products : Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla bla',
      price: 122,
      stock: 12,
      image: 'https://i.imgur.com/U4iGx1j.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'bla bla bla',
      price: 122,
      stock: 12,
      image: 'https://i.imgur.com/U4iGx1j.jpg'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'bla bla bla',
      price: 122,
      stock: 12,
      image: 'https://i.imgur.com/U4iGx1j.jpg'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'bla bla bla',
      price: 122,
      stock: 12,
      image: 'https://i.imgur.com/U4iGx1j.jpg'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'bla bla bla',
      price: 122,
      stock: 12,
      image: 'https://i.imgur.com/U4iGx1j.jpg'
    },
  ]

  findAll() {
    return this.products
  }

  findOne(id: number) {
    const product = this.products.find(item => item.id === id)
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return product
  }

  create(payload: CreateProductDto) {
    this.counterId++
    const newProduct = {
      id: this.counterId,
      ...payload
    }
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) throw new NotFoundException(`Product #${id} not found`)
    this.products[index] = {
      ...this.products[index],
      ...payload
    }
    return this.products[index]
  }

  delete(id: number) {
    const index = this.products.findIndex(item => item.id === id)
    if ( index === -1) throw new NotFoundException(`Product #${id} not found`)
    this.products.splice(index, 1)
    return id
  }
}
