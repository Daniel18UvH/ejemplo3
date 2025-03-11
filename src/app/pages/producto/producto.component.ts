import { Component } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto', // Selector del componente
  standalone: true, // Componente independiente
  imports: [CommonModule, FormsModule], // Importa CommonModule y FormsModule
  templateUrl: './producto.component.html', // Ruta del archivo HTML
  styleUrls: ['./producto.component.css'] // Ruta del archivo CSS
})
export class ProductoComponent {
  title = 'Catálogo de Productos';
  producto = { id: 0, descripcion: '', precio: 0 }; // Objeto para el formulario
  productos: any[] = []; // Lista de productos

  constructor(private firestore: Firestore) {
    this.cargarProductos(); // Cargar productos al iniciar
  }

  // Cargar productos desde Firebase
  async cargarProductos() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'productos'));
      this.productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      alert('Hubo un error al cargar los productos');
    }
  }

  // Agregar un producto a Firebase
  async agreProducto() {
    if (this.producto.id === 0) {
      alert('El ID debe ser diferente de CERO');
      return;
    }

    // Verificar si el ID ya existe
    const existe = this.productos.some(prod => prod.id === this.producto.id);
    if (existe) {
      alert('Ya existe un producto con este ID');
      return;
    }

    try {
      await addDoc(collection(this.firestore, 'productos'), {
        id: this.producto.id,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio
      });

      await this.cargarProductos(); // Recargar la lista de productos
      this.producto = { id: 0, descripcion: '', precio: 0 }; // Limpiar el formulario
      alert('Producto agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Hubo un error al agregar el producto');
    }
  }

  // Seleccionar un producto para editarlo
  selecProducto(producto: any) {
    this.producto = { ...producto }; // Copiar el producto seleccionado al formulario
  }

  // Eliminar un producto de Firebase
  async eliminarProd(id: string) {
    try {
      const productoRef = doc(this.firestore, 'productos', id);
      await deleteDoc(productoRef);
      await this.cargarProductos(); // Recargar la lista de productos
      alert('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Hubo un error al eliminar el producto');
    }
  }

  // Modificar un producto en Firebase
  async modiProducto() {
    try {
      const productoRef = doc(this.firestore, 'productos', this.producto.id.toString());
      await updateDoc(productoRef, {
        descripcion: this.producto.descripcion,
        precio: this.producto.precio
      });

      await this.cargarProductos(); // Recargar la lista de productos
      this.producto = { id: 0, descripcion: '', precio: 0 }; // Limpiar el formulario
      alert('Producto modificado correctamente');
    } catch (error) {
      console.error('Error al modificar el producto:', error);
      alert('Hubo un error al modificar el producto');
    }
  }
}