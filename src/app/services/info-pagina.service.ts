import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {}; // como no podemos mandar un objeto vacio, le ponemos ? a cada atributo de la interface
  cargada = false; //para saber cuando la info ya la tenemos cargada
  
  equipo: any[] = [];
  

  constructor( private http: HttpClient) { 
    console.log('Servicio de info página listo');
    this.cargarInfo();
    this.cargarEquipo();
    
  }
  private cargarInfo(){
    //Leer el archivo json
    this.http.get('assets/dat-pagina.json')
      .subscribe( (resp: InfoPagina) => { //la respuesta
       // console.log(resp);
        //console.log(resp['facebook']);
        this.cargada = true;
        this.info = resp;

      });
  }
  private cargarEquipo(){
    this.http.get('https://portafolio-f52b0.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) =>{
      this.equipo = resp
      //console.log(resp);
    });
    
  }
}
