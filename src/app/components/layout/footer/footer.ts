import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../../../services/comments-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  formData!: FormGroup;
  content: any = [CommentsService];
  commentType: any = [];

  userData!: any
  constructor(
    private commentService: CommentsService,
    private router: Router
    , private authService: AuthService
  ) {
    this.formData = new FormGroup({
      content: new FormControl('', []),
      typeOfComment: new FormControl('', []),
    });
  }

  onSubmit() {
    console.log(this.userData)
    const inputData: any = {
      content: this.formData.get('content')?.value,
      typeOfComment: this.formData.get('typeOfComment')?.value,
    }


    if (this.userData) {
      inputData.commentUserId = this.userData._id;
      inputData.commentUserName = this.userData.userName;
      inputData.commentUserEmail = this.userData.userEmail;
    }

    //   commentUserId:
    // commentUserName:
    // commentUserEmail:
    // content:


    if (this.formData.valid) {
      // const formValues = this.formData.value;
      // console.log(formValues)
      this.commentService.addComment(inputData).subscribe({
        next: (response) => {
          console.log('Comment added successfully:', response);
          this.router.navigateByUrl('/home');

        },
        error: (error) => {
          console.error('Error adding comment:', error);
        },
        complete: () => { }
      });
    }
    else {
      console.log('Form is invalid');
    }
    this.formData.reset();
  };
  ngOnInit() {
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData
    })
  }
  // ngOnInit() {
  //   this.commentService.getComments().subscribe({
  //     next: (data) => {
  //       console.log(data)
  //       this.content = data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching comments:', error);
  //     },
  //     complete: () => { }
  //   });
  // }
  // ngOnInit() {
  //   this.commentService.getComments().subscribe({
  //     next: (data) => {
  //       console.log(data)
  //       this.content = data;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching comments:', error);
  //       // Check if the error is an HttpErrorResponse and has a 404 status
  //       if (error.status === 404) {
  //         console.error('Comments endpoint not found.');
  //         // Handle the 404 error, e.g., display a "No comments found" message
  //       } else {
  //         // Handle other types of errors
  //         console.error('An unexpected error occurred:', error);
  //       }
  //     },
  //     complete: () => { }
  //   });
  // }
};