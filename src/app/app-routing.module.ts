import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'user-details', loadChildren: './pages/user-details/user-details.module#UserDetailsPageModule' },
  { path: 'task-list', loadChildren: './pages/task-list/task-list.module#TaskListPageModule', canActivate: [AuthGuard] },
  { path: 'task-form', loadChildren: './pages/task-form/task-form.module#TaskFormPageModule' },
  { path: 'task-form/:id', loadChildren: './pages/task-form/task-form.module#TaskFormPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
