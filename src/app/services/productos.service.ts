import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductoInterface[] = [];
  //para busacar el temino
  productoFiltraso: ProductoInterface[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    //TRABAJAR EN BASE A PROMESAS, PARA QUE CIERTO CÓDIGO SE EJECUTE HASTA QUE ESTO PASE
    return new Promise( ( resolve, reject) => {
      this.http.get('https://portafolio-f52b0.firebaseio.com/productos_idx.json')
    .subscribe( (resp: ProductoInterface[])=>{
      //console.log(resp);
      this.productos = resp
      setTimeout(() => {
        this.cargando = false;
      },2000);
      resolve();
      });
    });
    
  }
  getProducto(id: String){ //es un template literal para poner cosas de js dentro
    return this.http.get(`https://portafolio-f52b0.firebaseio.com/productos/${ id }.json`);
  }

  bucarProducto( termino: string){

    if (this.productos.length == 0) {
      //cargamos los productos, si ya termino de cargar ahora si filtar
      this.cargarProductos().then( () => {
        //después de tener los productos filtrar
        this.filtrarProductos( termino );

      });
      
    }else{
      //filtrar si ya estan ahí
      this.filtrarProductos( termino );
    }



    /*//barro el arreglo y regreso uno nuevo
    this.productoFiltraso =  this.productos.filter( producto  => {
      return true;
    });

    console.log(this.productoFiltraso);*/

  }

  private filtrarProductos( termino: string){
    //llenar producto sfiltrados en base a lo que me solicita el user
    this.productoFiltraso = []; //lo dejo basio cadad que entra
    termino = termino.toLowerCase();   //vamos a volver el termino in sensitive


    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLowerCase();//digo que el titulo tambien es in sentituve

      //si una parte o en total de lo que me piden pertence a alguna categoria o por nombre

      if (prod.categoria.indexOf( termino ) >=0 || tituloLower.indexOf(termino) >= 0 ) {

       

        this.productoFiltraso.push( prod );
        
      }
    })

  }


}



