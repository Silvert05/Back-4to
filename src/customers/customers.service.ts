import { Injectable } from '@nestjs/common';
import { Customer } from './interface/customer/customer.interface';

@Injectable()
export class CustomersService {
    private customers: Customer[] =[
        {
            id: 1,
            name: 'Pamela Pogo',
            age:31,
            birthday: new Date('1999-02-06')
        },
        {
            id: 2,
            name: 'Camila Eras',
            age:16,
            birthday: new Date('2007-12-02')
        },
        {
            id: 3,
            name: 'Matias Alejandro',
            age:14,
            birthday: new Date('2025-12-03')
        },
        {
            id: 4,
            name: 'Valentina Danahe',
            age:12,
            birthday: new Date('1980-06-07')
        }
    ]

    //READ 
    getAll(): Customer[] {
        return this.customers;
      }
    
      getId(id: number){
        return this.customers.find( (item: Customer) => item.id == id);
      }
    
      insert(body: any) {
        this.customers = [
          ...this.customers,
          {
            id: this.lastId() + 1,
            name: body.name,
            age: body.age,
            birthday: body.birthday,
          }
        ];
      }
      private lastId(): number {
        return this.customers[this.customers.length - 1].id;
      }

      //UPDATE DEL CRUD
      update(id: number, body: any) {
        let product: Customer = {
            id,
            name: body.name,
            age: body.age,
            birthday: body.birthday,
        }
        this.customers = this.customers.map( (item: Customer) => {
          console.log(item, id, item.id == id);
          return item.id == id ? product : item;
        });
      }
      delete(id: number) {
        this.customers = this.customers.filter( (item: Customer) => item.id != id );
      } 
}
