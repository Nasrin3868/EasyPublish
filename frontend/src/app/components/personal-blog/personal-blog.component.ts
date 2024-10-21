import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { blogData, blogResponse } from 'src/app/model/usermodel';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-blog',
  templateUrl: './personal-blog.component.html',
  styleUrls: ['./personal-blog.component.css']
})
export class PersonalBlogComponent implements OnInit{

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _messageToaster:MessageToasterService
  ){}

  blogs!:blogResponse[]
  userId!:string|null

  ngOnInit(): void {
    this.userId=localStorage.getItem('accessedUser')
      this.personalBlogs(this.userId)
  }

  // Function to truncate content to the first 15 words
  getTruncatedContent(content: string): string {
    const words = content.split(' ');
    if (words.length > 15) {
        return words.slice(0, 15).join(' ');
    }
    return content;
  }

  displayBlog(blogId:any){
    console.log('display blog:',blogId);
    this._router.navigate(['display_blog',blogId])
  }
  addBlogs(){
    this._router.navigate(['create_blog'])
  }

  personalBlogs(userId:string|null){
    if(!userId){
      userId=localStorage.getItem('accessedUser')
    }
    if(userId){
      this._userService.PersonalBlogs(userId).subscribe({
        next:(Response)=>{
          this.blogs=Response
          console.log(Response);
          // this._messageToaster.showSuccessToastr(Response.message)
        }
      })
    }else{
      this._messageToaster.showErrorToastr('User not found')
    }

  }
}
