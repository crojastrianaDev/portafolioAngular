import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';

//como funcinaran las rutas definimos casa ruta
const routes: Routes = [
  {path: 'home', component: PortafolioComponent }, //inicialmente siempre
  {path: 'about', component: AboutComponent },
  {path: 'item', component: ItemComponent },
  {path: '**',  pathMatch: 'full', redirectTo: 'home' } //ruta de exception
];

@NgModule({ //Configuración 
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
