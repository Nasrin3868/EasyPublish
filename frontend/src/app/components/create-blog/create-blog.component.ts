import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { namePattern } from 'src/app/common/regularExpressions';
import { blogData } from 'src/app/model/usermodel';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { MessageToasterService } from 'src/app/services/message-toaster.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogForm!: FormGroup;
  topics: string[] = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Other'];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private _fb: FormBuilder,
    private _userService:UserService,
    private _cloudinaryService:CloudinaryService,
    private _router:Router,
    private _messageToaster:MessageToasterService
  ) {}

  ngOnInit() {
    this.blogForm = this._fb.group({
      topic: ['', Validators.required],
      otherTopic: [''],
      title: ['', Validators.required,Validators.minLength(5)],
      content: ['', Validators.required],
      image: ['',Validators.required]
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

  onSubmit() {
    if (this.blogForm.invalid) {
      this.markFormGroupTouched(this.blogForm);
      return;
    }

    // Upload the image to Cloudinary
    if (this.selectedFile) {
      this._cloudinaryService.uploadImage(this.selectedFile, 'medilink24').subscribe({
        next: (response) => {
          const image= response; 
          console.log(image);
          
          const blogData:blogData = {
            userId:localStorage.getItem('accessedUser'),
            topic: this.blogForm.get('topic')?.value,
            otherTopic: this.blogForm.get('otherTopic')?.value || '',
            title: this.blogForm.get('title')?.value,
            content: this.blogForm.get('content')?.value,
            image 
          };

          this._userService.createBlog(blogData).subscribe({
            next: (response) => {
              console.log('Blog created successfully:', response);
              this._messageToaster.showSuccessToastr(response.message)
              this._router.navigate(['personal_blog'])
            },
            error: (error) => {
              console.error('Error creating blog:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
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
