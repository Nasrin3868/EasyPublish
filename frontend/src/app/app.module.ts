import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { DisplayBlogComponent } from './components/display-blog/display-blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalBlogComponent } from './components/personal-blog/personal-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OtpComponent } from './components/otp/otp.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { EmailForForgetPasswordComponent } from './components/email-for-forget-password/email-for-forget-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { AppHighlightDirective } from './app-highlight.directive';
import { CustomPipe } from './custom.pipe';
import { TokenInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CreateBlogComponent,
    DisplayBlogComponent,
    ProfileComponent,
    PersonalBlogComponent,
    OtpComponent,
    AllBlogsComponent,
    EditBlogComponent,
    EmailForForgetPasswordComponent,
    NewPasswordComponent,
    AppHighlightDirective,
    CustomPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
