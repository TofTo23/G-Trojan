import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: Date;
}

interface StoredComment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    DatePipe
  ],
  templateUrl: './blog-list.html',
  //styleUrls: ['./blog-list.css'] 
})
export class BlogList implements OnInit {
  blogs: Blog[] = [
    {
      id: 1,
      title: 'Podziel się opinią!',
      content: 'Twoje zdanie jest dla nas ważne. Zostaw komentarz poniżej.',
      comments: []
    }
  ];

  commentForm: FormGroup;

  constructor() {
    this.commentForm = new FormGroup({
      author: new FormControl('', [Validators.required, Validators.minLength(3)]),
      text: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {
    this.loadComments();
  }

  addComment(blogId: number) {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const blog = this.blogs.find(b => b.id === blogId);
    if (blog) {
      const { author, text } = this.commentForm.value;

      const newComment: Comment = {
        id: Date.now(),
        author: author || 'Anonim',
        text: text,
        date: new Date()
      };
      blog.comments.push(newComment);

      this.commentForm.reset();
      this.saveComments();
    }
  }

  private loadComments() {
    const stored = localStorage.getItem('blog-comments');
    if (stored) {
      const commentsData: { [blogId: number]: StoredComment[] } = JSON.parse(stored);
      for (const blog of this.blogs) {
        if (commentsData[blog.id]) {
          blog.comments = commentsData[blog.id].map(c => ({
            ...c,
            date: new Date(c.date)
          }));
        }
      }
    }
  }

  private saveComments() {
    const commentsData: { [blogId: number]: StoredComment[] } = {};
    for (const blog of this.blogs) {
      commentsData[blog.id] = blog.comments.map(c => ({
        ...c,
        date: c.date.toISOString()
      })) as StoredComment[];
    }
    localStorage.setItem('blog-comments', JSON.stringify(commentsData));
  }
}