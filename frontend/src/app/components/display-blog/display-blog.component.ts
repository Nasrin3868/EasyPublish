import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { blogResponse } from 'src/app/model/usermodel';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css']
})
export class DisplayBlogComponent implements OnInit{

  constructor(
    private _userService:UserService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _messageService:MessageToasterService,
    private _viewportScroller: ViewportScroller
  ){}

  blogId!:string;
  blogDetails!:blogResponse
  userId!:string|null
  edit:boolean=false

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._viewportScroller.scrollToPosition([0,0]);
        // this.viewportScroller.scrollToPosition([0, 0]);  // Scroll to the top of the page
      }
    });
    this.userId=localStorage.getItem('accessedUser')
    this._route.params.subscribe(params => {
      this.blogId = params['_id'];
      this.getBlogDetails(this.blogId); // Call method to get blog details
    });
  }

  editBlog(blogId: string) {
    console.log(blogId);
    this._router.navigate(['edit_blog', blogId]);
  }

  deleteBlog(blogId:string){
    this._userService.deleteBlog(blogId).subscribe({
      next:(Response)=>{
        console.log('blog deleted');
        this._messageService.showSuccessToastr(Response.message)
        this._router.navigate(['personal_blog'])
      },error:(Error)=>{
        this._messageService.showErrorToastr(Error.error)
      }
    })
  }


  // Method to convert newlines to <br> tags
  formatContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }

  getBlogDetails(blogId:string){
    this._userService.SingleBlog(blogId).subscribe({
      next:(Response)=>{
        this.blogDetails=Response
        if(this.blogDetails.userId._id===this.userId){
          this.edit=true
        }
        // console.log('blogDetails:',this.blogDetails.userId);
      },error:(error)=>{
        this._messageService.showErrorToastr(error.error)
      }
    })
  }

  
}
