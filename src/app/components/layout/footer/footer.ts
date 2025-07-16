import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../../../services/comments-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  formData!: FormGroup
  content: any = [];
  commentType: any = [];

  constructor(
    private commentService: CommentsService,
    private router: Router
  ) {
    this.formData = new FormGroup({
      content: new FormControl('', []),
      typeOfComment: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      const formValues = this.formData.value;
      this.commentService.addComment(formValues).subscribe({
        next: (response) => {
          console.log('Comment added successfully:', response);
          this.router.navigateByUrl('/dashboard/comments');
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
    this.commentService.getComments().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      },
      complete: () => { }
    });
  }
};