import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { namePattern } from 'src/app/common/regularExpressions';
import { blogData, blogResponse } from 'src/app/model/usermodel';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit{

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _messageService:MessageToasterService,
    private _fb:FormBuilder,
    private _cloudinaryService:CloudinaryService,
  ){}

  blogId!:string
  blogDetails!:blogResponse
  blogForm!:FormGroup
  originalFormData!:FormGroup
  selectedFile: File | null = null;
  topics: string[] = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Other'];
  imagePreview: string | ArrayBuffer | null = null;


  ngOnInit(): void {
    console.log('edit blog');
    this._route.params.subscribe(params => {
      this.blogId = params['id']; // Use 'id' instead of '_id'
      this.getBlogDetails(this.blogId); // Call method to get blog details
    });
    this.editBlogForm();
  }
  
  editBlogForm(){
    this.blogForm=this._fb.group({
      topic: ['', Validators.required],
      otherTopic: [''],
      title: ['', [Validators.required,Validators.minLength(5)]],
      content: ['', Validators.required],
      image: ['',Validators.required]
    })
  }



  onSubmit() {
    if(this.blogForm.invalid){
      this.markFormGroupTouched(this.blogForm);
      return;
    }
    if(!this.selectedFile){
      if (this.areFormValuesUnchanged()) {
        console.log("No changes made. Skipping backend call.");
        this._messageService.showWarningToastr('No changes detected. The blog remains unchanged.');
        this._router.navigate(['display_blog',this.blogId])
        return;
      }
    }
    
    let blogData:blogData={
      userId:localStorage.getItem('accessedUser'),
      _id:this.blogId,
      topic: this.blogForm.get('topic')?.value,
      otherTopic: this.blogForm.get('otherTopic')?.value || '',
      title: this.blogForm.get('title')?.value,
      content: this.blogForm.get('content')?.value,
      image: this.blogForm.get('image')?.value
    }
    
    if(this.selectedFile){
      this._cloudinaryService.uploadImage(this.selectedFile, 'medilink24').subscribe({
        next: (response) => {
          const image= response; 
          console.log("Image uploaded successfully:",image);
          blogData.image=image
          console.log('image from blogData:',blogData.image);
          this.submitEditBlog(blogData)
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this._messageService.showErrorToastr(error.error)
        }
      });
    }else{
      this.submitEditBlog(blogData)
    }
  }
  
  submitEditBlog(blogData:blogData){
    this._userService.editBlog(blogData).subscribe({
      next: (response) => {
        console.log('Blog edited successfully:', response);
        this._messageService.showSuccessToastr(response.message)
        this._router.navigate(['display_blog',this.blogId])
      },
      error: (error) => {
        console.error('Error creating blog:', error);
        this._messageService.showErrorToastr(error.error)
      }
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onTopicChange() {
    const topicControl = this.blogForm.get('topic');
    const otherTopicControl = this.blogForm.get('otherTopic');
    if (topicControl?.value === 'Other') {
      otherTopicControl?.setValidators([Validators.required,Validators.pattern(namePattern)]);
    } else {
      otherTopicControl?.clearValidators();
    }
    otherTopicControl?.updateValueAndValidity();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.selectedFile = file || null;
    if (this.selectedFile) {
      // Clear the validation for the image field after a file is selected
      this.blogForm.get('image')?.clearValidators();
      this.blogForm.get('image')?.updateValueAndValidity();
      // Preview the image
      this.previewImage();
    }
  }

  previewImage() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        console.log(this.imagePreview);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getBlogDetails(blogId:string){
    this._userService.SingleBlog(blogId).subscribe({
      next: (Response) => {
        this.blogDetails = Response;
        // Set the image preview if image exists
        if (this.blogDetails.image) {
          this.imagePreview = this.blogDetails.image;
        }
        console.log(Response.topic);
        
        if(!this.topics.includes(this.blogDetails.topic)){
          this.blogForm.patchValue({
            topic:'Other',
            otherTopic:Response.topic,
            title: this.blogDetails.title,
            content: this.blogDetails.content,
            image: this.blogDetails.image
          })
        }else{
          this.blogForm.patchValue({
            topic: this.blogDetails.topic,
            title: this.blogDetails.title,
            content: this.blogDetails.content,
            image: this.blogDetails.image
          });
        }
        // Store the original form data for comparison
        this.originalFormData = this.blogForm.getRawValue()

      },
      error: (error) => {
        this._messageService.showErrorToastr(error.error);
      }
    });
  }

  // Function to compare form values with the original data
  areFormValuesUnchanged(): boolean {
    const currentFormData = this.blogForm.getRawValue();
    console.log('raw value of form:',this.blogForm.getRawValue());
    console.log('original value:',this.originalFormData);
    
    return JSON.stringify(this.originalFormData) === JSON.stringify(currentFormData);
  }

}
