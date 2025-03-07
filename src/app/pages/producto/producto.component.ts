import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../service/producto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
updateProducto() {
throw new Error('Method not implemented.');
}
  productos: any;
  libro = new Producto();

  constructor(private productoService: ProductoService) {
    this.getProductos();
  }

  async getProductos(): Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProducto());
  }

  insertProducto() {
    this.productoService.agregarProducto(this.libro);
    this.getProductos();
    this.libro = new Producto();
  }

  selectProducto(productoSeleccionado: Producto) {
    this.libro = productoSeleccionado;
  }

  updateProductos() {
    this.productoService.modificarProducto(this.libro);
    this.productos = new Producto();
    this.getProductos();
  }

  deleteProducto() {
    this.productoService.elimiProducto(this.libro);
    this.libro = new Producto();
    this.getProductos();
  }
}