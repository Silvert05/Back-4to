import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, NotFoundException, BadRequestException, Res } from '@nestjs/common';
import { Customer } from './interface/customer/customer.interface';
import { CustomersService } from './customers.service'; 
import { CustomersDto } from './dto/customers.dto/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  // Usar QUERY
  @Get('query')
  rutaQuery(@Query() query) {
    if (!query.x || !query.y) {
      throw new BadRequestException('Faltan los parámetros de consulta x o y');
    }
    return `El dato query.x ha recibido el valor ${query.x} y el valor de y es: ${query.y}`;
  }

  // Obtener todos los clientes
  @Get()
  getAllCustomers(): Customer[] {
    const customers = this.customerService.getAll();
    if (customers.length === 0) {
      throw new NotFoundException('No se encontraron clientes');
    }
    return customers;
  }

  // Obtener un cliente por ID
  @Get(':id')
  async find(@Param('id' ,new ParseIntPipe) id: number) {
    const customer = this.customerService.getId(id);
    if (!customer) {
      throw new NotFoundException(`No se encontró el cliente con ID ${id}`);
    }
    return customer;
  }

  // Crear un cliente
  @Post()
  @HttpCode(HttpStatus.OK)
  createCustomers(
    @Body() custumerDto: CustomersDto,
  ) {
    this.customerService.insert(custumerDto);
  }

  // Eliminar un cliente por ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) { 
    const customer = this.customerService.getId(id);
    if (!customer) {
      throw new NotFoundException(`No se encontró el cliente con ID ${id}`);
    }
    this.customerService.delete(id);
    return `Hemos borrado al cliente ${id}`;
  }

  // Actualizar un cliente por ID
  @Put(':id')
  async update(@Param('id' , new ParseIntPipe) id: number, @Body() body) {
    const customer = this.customerService.getId(id);
    if (!customer) {
      throw new NotFoundException(`No se encontró el cliente con ID ${id}`);
    }
    return this.customerService.update(id, body);
  }
   // Ruta con decorador @Res para control de estado
    @Get('detalle/:id')
    findWithResponse(@Res() response, @Param('id') id: number) {
      if (id < 100) {
        return response
          .status(HttpStatus.OK)
          .send(`Página del producto: ${id}`);
      } else {
        return response
          .status(HttpStatus.NOT_FOUND)
          .send(`Producto inexistente`);
      }
    }
}
