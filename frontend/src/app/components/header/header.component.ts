import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userToken!:string|null
  profileStatus:boolean=false
  constructor(
    private _router:Router
  ){}

  ngOnInit(): void {
      this.userToken=localStorage.getItem('accessToken')
      if(this.userToken){
        this.profileStatus=true
      }else{
        this.profileStatus=false
      }
  }

  login(){
    this._router.navigate(["/login"])
  }
  home(){
    this._router.navigate(["/home"])
  }
  personal_blog(){
    this._router.navigate(['/personal_blog'])
  }
  blog(){
    this._router.navigate(["/all_blog"])
  }
  add_blog(){
    this._router.navigate(['create_blog'])
  }
  profile(){
    this._router.navigate(['/profile'])
  }
  logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessedUser')
    // localStorage.removeItem('newEmail')
    // localStorage.removeItem('email')
    this.profileStatus=false
    this._router.navigate(['home'])
  }
}
