import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { MyCartComponent } from './my-cart/my-cart.component';


const routes: Routes = [
  {path : '', component: PostListComponent},
  {path : 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path : 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  {path : "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path : 'search/:searchTerm', component: PostListComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'post-detail/:postId', component: PostDetailsComponent},
  {path: 'my-cart', component: MyCartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
