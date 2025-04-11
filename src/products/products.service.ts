import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
          id: 1,
          name: 'Vela aromática',
          description: 'Esta vela lanza ricos olores',
        },
        {
          id: 2,
          name: 'Marco de fotos pequeño',
          description: 'Marco ideal para tus fotos 10x15',
        },
        {
            id: 3,
            name: 'Marco de fotos medianos',
            description: 'Marco ideal pata tus fotos 30x25',
          },
          {
            id: 4,
            name: 'Marco de fotos grandes',
            description: 'Marco ideal para tus fotos 50x35',
          },
      ];
      getAll(): Product [] {
        return this.products;
      }
//READ
     getId(id: number) {
        return this.products.find( (item: Product) => item.id == id);
        }

//CREATE
      insert(body: any){
        this.products =[
            ...this.products,
            {
                id: this.lastId() +1,
                name: body.name,
                description: body.description,
            }
        ]
      }

//UPDATE
update(id: number, body: any) {
    let product: Product = {
      id,
      name: body.name,
      description: body.description,
    }
    this.products = this.products.map( (item: Product) => {
      console.log(item, id, item.id == id);
      return item.id == id ? product : item;
    });
  }

//DELETE
  delete(id: number) {
    this.products = this.products.filter( (item: Product) => item.id != id );
  }

  private lastId(): number {
    return this.products[this.products.length - 1].id;
  }

}

