import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import {AddTaskComponent} from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [{ path: '', component: TaskListComponent },
  {path: 'add-task', component: AddTaskComponent},
  {path: 'edit-task/:id', component: EditTaskComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
