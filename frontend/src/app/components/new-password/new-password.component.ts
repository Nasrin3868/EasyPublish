import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordPattern } from 'src/app/common/regularExpressions';
import { newPassword } from 'src/app/model/usermodel';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{
  constructor(
    private _userService:UserService,
    private _router:Router,
    private _formBuilder:FormBuilder,
    private _messageService:MessageToasterService
  ){}
  email!:string|null

  ngOnInit(): void {
    this.email=localStorage.getItem('email')
  }


  passwordForm=this._formBuilder.group({
    password:['',[Validators.required,Validators.pattern(passwordPattern)]],
    confirmPassword:['',[Validators.required]],
  })
  
  onSubmit(){
    if(this.passwordForm.invalid){
      this.markFormGroupTouched(this.passwordForm)
      return
    }
    if(this.passwordForm.value.password!==this.passwordForm.value.confirmPassword){
      this._messageService.showErrorToastr('Passowrds not matching')
      this.passwordForm.patchValue({
        password:'',
        confirmPassword:''
      })
      return
    }
    if(this.email&&this.passwordForm.value.password){
      const data:newPassword={
        email:this.email, 
        password:this.passwordForm.value.password,
      }
      this._userService.newPassword(data).subscribe({
        next:(Response)=>{
          this._messageService.showSuccessToastr(Response.message)
          this._router.navigate(['login'])
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
