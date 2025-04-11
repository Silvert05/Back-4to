import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { Product } from './interfaces/product/product.interface';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Obtener todos los productos
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  // Obtener un producto por ID
  @Get(':id')
  find(@Param('id') id: number) {
    return this.productsService.getId(id);
  }

  // Obtener un producto con tamaño (ruta adicional)
  @Get(':id/:size')
  findWithSize(@Param('id') id: number, @Param('size') size: string) {
    return `Detalle de producto ${id}, en tamaño ${size}`;
  }

  // Endpoint para mensaje de inventario (prueba)
  @Get('inventario')
  getHelloInProduct(): string {
    return 'Estamos en produccion';
  }
  
  @Get('query')
rutaQuery(@Query() query) {
  const x = query.x || 'No proporcionado';
  const y = query.y || 'No proporcionado';
  return `El dato query.x ha recibido el valor ${x} y el valor de y es: ${y}`;
}


  // Ruta con error 404 personalizado
  @Get('ruta-error-404')
  @HttpCode(HttpStatus.OK)
  rutaConError404() {
    return 'Esto es un error 404!! no existe';
  }

  // Ruta con decorador @Res para control de estado
  @Get('respuesta/:id')
  findWithResponse(@Res() response: Response, @Param('id') id: number) {
    if (id < 100) {
      return response.status(HttpStatus.OK).send(`Página del producto: ${id}`);
    } else {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(`Producto inexistente`);
    }
  }

  // Crear un nuevo producto
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(@Body() body: Product) {
    this.productsService.insert(body);
  }

  // Actualizar un producto por ID
  @Put(':id')
  update(@Param('id') id: number, @Body() body: Product) {
    return this.productsService.update(id, body);
  }

  // Actualización parcial (PATCH)
  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() body: Partial<Product>) {
    return `Actualización parcial del ítem ${id}`;
  }

  // Eliminar un producto por ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.productsService.delete(id);
  }
}
