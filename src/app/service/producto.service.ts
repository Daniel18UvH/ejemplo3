import { Injectable, inject } from '@angular/core';
import { Producto } from '../models/producto.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import {first} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  //metodo para obtener todos los documentos de la coleccion
  getProducto(){
    const productoCollection = collection(this.db, 'productos');
    return collectionData((productoCollection), {idField: 'id'}).pipe(first());
  }

  //metodo para agregar un documento a la coleccion
  agregarProducto(producto:Producto){
    const productosCollection = collection(this.db, 'productos');
    const productooData = {
      marca: producto.marca,
      nombre: producto.nombre,
      caducidad: producto.caducidad,
      cantidad: producto.cantidad
    };

    addDoc(productosCollection, productooData);
  }

  //metodo para modificar un documento
  modificarProducto(producto:Producto){
    const documentRef = doc(this.db, 'productos', producto.id);
    updateDoc(documentRef, {
      marca: producto.marca,
      nombre: producto.nombre,
      caducidad: producto.caducidad,
      cantidad: producto.cantidad
    });
  }

  //metodo para borrar un documento
  elimiProducto(producto:Producto){
    const documentRef = doc(this.db, 'productos', producto.id);
    deleteDoc(documentRef);
  }

}
