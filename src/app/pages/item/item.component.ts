import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto:  ProductoDescripcion;//en este caso tenemos undefined
  id: string;

  constructor( private route: ActivatedRoute, public ProductosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
     // console.log(parametros['id']);

      this.ProductosService.getProducto(parametros['id'])
      .subscribe( (producto: ProductoDescripcion) =>{
        //console.log(producto);
        this.id = parametros['id'];
        this.producto = producto
      } )

    });
  }

}
