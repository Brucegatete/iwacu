import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path : '', component: PostListComponent},
  {path : 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path : 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path : "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path : 'search/:searchTerm', component: PostListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
