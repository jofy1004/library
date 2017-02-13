import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddComponent} from "./book/add.component";
import {EditComponent} from "./book/edit.component";


const appRoutes: Routes = [
  {
    path: 'manage/:id',
    component: AddComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
