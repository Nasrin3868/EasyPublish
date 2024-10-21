import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { namePattern, passwordPattern } from 'src/app/common/regularExpressions';
import { userregister } from 'src/app/model/usermodel';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{
  registrationForm!: FormGroup;

  constructor(
    private _formBuilder:FormBuilder,
    private _router:Router,
    private _userService:UserService,
    private _messageToaster:MessageToasterService
  ){}

  ngOnInit(): void {
    this.registrationForm=this._formBuilder.group({
      firstname:['',[Validators.required,Validators.pattern(namePattern)]],
      lastname:['',[Validators.required,Validators.pattern(namePattern)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(passwordPattern)]],
      confirmPassword:['',Validators.required]
    })
  }
  
  onSubmit() {
   if(this.registrationForm.invalid){
    this.markFormGroupTouched(this.registrationForm)
    return
   }else{
     console.log('form submitted');
    if(this.registrationForm.get('password')?.value as string!==this.registrationForm.get('confirmPassword')?.value as string){
      this._messageToaster.showErrorToastr("Passwords are not matching")
    }else{
      const data:userregister={
        firstname:this.registrationForm.get('firstname')?.value as string,
        lastname:this.registrationForm.get('lastname')?.value as string,
        email:this.registrationForm.get('email')?.value as string,
        password:this.registrationForm.get('password')?.value as string,
      }
      this._userService.userregister(data).subscribe({
        next:(Response)=>{
          console.log('userregistered',Response);
          localStorage.setItem('email',this.registrationForm.get('email')?.value)
          localStorage.removeItem('new_email')
          this._router.navigate(['otp'])
          this._messageToaster.showSuccessToastr(Response.message)
        },
        error:(Error)=>{
          console.log('not registered',Error);
          this._messageToaster.showErrorToastr(Error.error.message)
        }
      })
    }
   }
  }

  login(){
    this._router.navigate(["login"])
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*\s*$/;

}
