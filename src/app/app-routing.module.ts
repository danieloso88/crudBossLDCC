import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreatePerroComponent} from './components/create-perro/create-perro.component';
import {ListPerrosComponent} from "./components/list-perros/list-perros.component";

const routes: Routes = [
  {path: '', redirectTo: "list-perros", pathMatch: 'full'},
  {path: 'list-perros', component: ListPerrosComponent},
  {path: 'create-perro', component: CreatePerroComponent},
  {path: 'edit-perro/:id', component: CreatePerroComponent},
  {path: '**', redirectTo: "list-perros", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
