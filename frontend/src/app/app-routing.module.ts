import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { DisplayBlogComponent } from './components/display-blog/display-blog.component';
import { PersonalBlogComponent } from './components/personal-blog/personal-blog.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OtpComponent } from './components/otp/otp.component';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { EmailForForgetPasswordComponent } from './components/email-for-forget-password/email-for-forget-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { authGuard } from './auth.guard';
// import { authGuard } from './auth.guard';

const routes: Routes = [ 
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:UserLoginComponent},
  {path:'email_verification',component:EmailForForgetPasswordComponent},
  {path:'new_password',component:NewPasswordComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'otp',component:OtpComponent},
  {path:'all_blog',component:AllBlogsComponent},
  {path:'display_blog/:_id',component:DisplayBlogComponent},
  {path:'personal_blog',component:PersonalBlogComponent,canActivate:[authGuard]},
  {path:'create_blog',component:CreateBlogComponent,canActivate:[authGuard]},
  { path: 'edit_blog/:id', component: EditBlogComponent,canActivate:[authGuard] },
  {path:'profile',component:ProfileComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
