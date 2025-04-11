import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './customers/customers.controller';
import { ProductsService } from './products/products.service';
import { CustomersService } from './customers/customers.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, UsersController, CustomersController],
  providers: [AppService, ProductsService, CustomersService],
})
export class AppModule {}
