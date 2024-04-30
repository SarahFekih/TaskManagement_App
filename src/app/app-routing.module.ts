import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { KanbanListComponent } from './Components/kanban-list/kanban-list.component';
import { KanbanComponent } from './Components/kanban/kanban.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'kanban/:id', component: KanbanComponent},
  {path: 'kanban', component: KanbanListComponent},
  {path: 'home', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
