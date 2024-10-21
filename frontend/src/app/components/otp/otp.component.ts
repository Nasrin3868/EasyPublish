import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { otpPattern } from 'src/app/common/regularExpressions';
import { verifyOtp } from 'src/app/model/usermodel';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{
  timerInterval: any;
  counter: number = 59;
  email!:string|null
  newEmail!:string|null

  constructor(
    private _router:Router,
    private _formBuilder:FormBuilder,
    private _userService:UserService,
    private _messageToaster:MessageToasterService
  ){}
  
  ngOnInit(): void {
      this.counterFn()
      this.email=localStorage.getItem('email')
      this.newEmail=localStorage.getItem('new_email')
      console.log('newEmail',this.newEmail);
      
  }

  otpForm = this._formBuilder.group({
    otp: ['', [Validators.required, Validators.pattern(otpPattern)]],
  });

  counterFn(){
    this.timerInterval=setInterval(()=>{
      this.counter--
      if(this.counter===0){
        clearInterval(this.timerInterval)
      }
    },1000)
  }

  resendClicked(){
    this.counter=59
    this.counterFn()
    // if(this._commonservice.getAuthFromLocalStorage()==='doctor'){
    //   this._doctorService.resendOtp({email:this.email}).subscribe({
    //     next:(response)=>{
    //       this._showMessage.showSuccessToastr(response.message)
    //       this.otpForm.reset()
    //     }
    //   })
    // }else{
    //   this._userService.resendOtp({email:this.email}).subscribe({
    //     next:(response)=>{
    //       this._showMessage.showSuccessToastr(response.message)
    //       this.otpForm.reset()
    //     }
    //   })
    // }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onSubmit(){
    if(this.otpForm.invalid){
      this.markFormGroupTouched(this.otpForm);
      return;
    }else{
      let otpData
      if(this.email&&this.otpForm.get('otp')?.value&&this.newEmail){
        otpData={
          newEmail:this.newEmail,
          email:this.email,
          otp:Number(this.otpForm.get('otp')?.value)
        }
        if(otpData.email&&otpData.otp&&otpData.newEmail){
          this.serverCall(otpData)
        }
      }else if(this.email&&this.otpForm.get('otp')?.value){
        otpData={
          email:this.email,
          otp:Number(this.otpForm.get('otp')?.value)
        }
        if(otpData.email&&otpData.otp){
          this.serverCall(otpData)
        }
      }
    }
  }

  serverCall(otpData:verifyOtp){
    console.log('otpData:',otpData);
    this._userService.verifyOtp(otpData).subscribe({
      next:(Response)=>{
        console.log(Response);
        localStorage.removeItem('email')
        localStorage.removeItem('newEmail')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('accesseduser')
        this._messageToaster.showSuccessToastr(Response.message)
        this._router.navigate(["login"])
      },error:(error)=>{
        console.log(error.error);
        this._messageToaster.showErrorToastr(error.error.message)
      }
    })
  }


}
