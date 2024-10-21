import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { blogResponse } from 'src/app/model/usermodel';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit{
  constructor(
    private _userService:UserService,
    private _router:Router,
    private _messageService:MessageToasterService
  ) {}

  blogs!:blogResponse[]

  addBlogs(){
    this._router.navigate(['create_blogs'])
  }

  ngOnInit(): void {
    this._userService.AllBlogs().subscribe({
      next:(Response)=>{
        this.blogs=Response
      }
    })
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
