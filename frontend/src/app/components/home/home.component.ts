import { Component, ContentChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { blogResponse } from 'src/app/model/usermodel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private _router:Router,
    private _userService:UserService,

  ){}

  blogs!:blogResponse[]
  ngOnInit(): void {
    console.log(localStorage.getItem('email'),localStorage.getItem('newEmail'));
    
    this._userService.AllBlogs().subscribe({
      next:(Response)=>{
        this.blogs = Response.slice(0, 6);
      }
    })
  }
  // name=''
  // value=200
  // onNotify(){
  //   alert('hei from child')
  // }

  addBlogs(){
    const currentRoute = this._router.url;

    if (currentRoute !== '/create_blog') {
        this._router.navigate(['create_blog']).catch(error => {
            console.error('Navigation error:', error);
        });
    } else {
        console.log('Already on create_blog page, no navigation needed.');
    }
  }

  moreBlogs(){
    this._router.navigate(['all_blog'])
  }

  displayBlog(blogId:string){
    this._router.navigate(['display_blog',blogId])
  }

  // Function to truncate content to the first 15 words
  getTruncatedContent(content: string): string {
    const words = content.split(' ');
    if (words.length > 15) {
        return words.slice(0, 15).join(' ');
    }
    return content;
  }

}
