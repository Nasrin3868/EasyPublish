import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-email-for-forget-password',
  templateUrl: './email-for-forget-password.component.html',
  styleUrls: ['./email-for-forget-password.component.css']
})
export class EmailForForgetPasswordComponent implements OnInit{
  constructor(
    private _formBuilder:FormBuilder,
    private _userService:UserService,
    private _router:Router,
    private _messageService:MessageToasterService
  ){}

  ngOnInit(): void {
      
  }

  emailForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit(){
    if(this.emailForm.invalid){
      this.markFormGroupTouched(this.emailForm)
      return
    }
    const data=this.emailForm.value.email
    if(data){
      console.log(data);
      
      this._userService.verifyEmail({email:data}).subscribe({
        next:(Response)=>{
          if(Response.email){
            localStorage.setItem('email',Response.email)
          }
          this._messageService.showSuccessToastr(Response.message)
          this._router.navigate(['new_password'])
        },error:(Error)=>{
        this._messageService.showErrorToastr(Error.error)
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
}
