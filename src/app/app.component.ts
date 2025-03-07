import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from "./pages/producto/producto.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ProductoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ejemplo3';

  //productos
  producto = {
    id: 0,
    descripcion: '',
    precio: 0
  };

  productos = [
    {id: 1, descripcion: 'coquita', precio: 22.50},
    {id: 2, descripcion: 'nachos', precio: 27.70},
    {id: 3, descripcion: 'pepsi', precio: 21.00},
    {id: 4, descripcion: 'chocolate', precio: 14.90},
    {id: 5, descripcion: 'hamburgues', precio: 52.50},
  ];

  //funcion para agregar un producto al arreglo
  agreProducto(){
    //validamos que el id no sea 0
    if(this.producto.id == 0){
      alert('el ID debe ser diferente de CERO');
      return;
    }
    //verificar que el ID no se repita
    for(let i = 0; i < this.productos.length; i++){
      if(this.producto.id == this.productos[i].id){
        alert('ya existe un producto con este ID');
        return;
      }
    }

    //agregamos el producto al arreglo
    this.productos.push({
      id: this.producto.id,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio
    });

    //reiniciamos el objeto producto a sus valores iniciales
    this.producto.id = 0;
    this.producto.descripcion = '';
    this.producto.precio = 0;
  }

  //funcion para seleccionar un producto existente
  selecProducto(productoseleccionado: { id: number; descripcion: string; precio: number }){
    this.producto.id = productoseleccionado.id;
    this.producto.descripcion = productoseleccionado.descripcion;
    this.producto.precio = productoseleccionado.precio;
  }

  //funcion para modificar el producto
  modiProducto(){
    for(let i = 0; i < this.productos.length; i++){
      if(this.producto.id == this.productos[i].id){
        this.productos[i].descripcion = this.producto.descripcion;
        this.productos[i].precio = this.producto.precio;

        //reseteamos el objeto producto
        this.producto.id = 0;
        this.producto.descripcion = '';
        this.producto.precio = 0;
        return;
      }
    }

    alert('No existe este ID'); //este mensaje es en caso de que no exista en nuestra tabla
  }

  //funcion para eliminar un producto del arreglo
  eliminarProd(id: number){
    for(let i = 0; i < this.productos.length; i++){
      if(id == this.productos[i].id){
        this.productos.splice(i, 1);
        return;
      }
    }
  }
}