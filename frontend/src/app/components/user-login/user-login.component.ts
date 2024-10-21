import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(
    private _router:Router,
    private _messageToaster:MessageToasterService,
    private _formBuilder:FormBuilder,
    private _userService:UserService
  ){}
  
  loginForm:FormGroup=this._formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })

  forgetPassword(){
    this._router.navigate(['email_verification'])
  }
  
  onSubmit(){
    if(this.loginForm.invalid){
      this.markFormGroupTouched(this.loginForm)
      return
     }else{
      const data={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this._userService.userLogin(data).subscribe({
        next:(Response)=>{
          this._router.navigate(["home"])
          localStorage.setItem('accessToken',Response.accessToken)
          localStorage.setItem('accessedUser',Response.accessedUser)
          localStorage.setItem('refreshToken', Response.refreshToken);
          console.log('Response userId:',Response.accessedUser);
          
          console.log('userId:',localStorage.getItem('accessedUser'));
          
          this._messageToaster.showSuccessToastr(Response.message)
        },error:(Error)=>{
          this._messageToaster.showErrorToastr(Error.error.message);
        }
      })
     }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  register(){
    this._router.navigate(["register"])
  }
}
