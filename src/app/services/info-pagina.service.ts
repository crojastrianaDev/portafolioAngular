import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {}; // como no podemos mandar un objeto vacio, le ponemos ? a cada atributo de la interface
  cargada = false; //para saber cuando la info ya la tenemos cargada

  constructor( private http: HttpClient) { 
    console.log('Servicio de info página listo');

    //Leer el archivo json
    this.http.get('assets/dat-pagina.json')
      .subscribe( (resp: InfoPagina) => { //la respuesta
        console.log(resp);
        console.log(resp['facebook']);

        this.cargada = true;
        this.info = resp;

      });
  }
}
