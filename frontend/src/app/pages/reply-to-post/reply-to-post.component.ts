import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply-to-post',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './reply-to-post.component.html',
  styleUrls: ['./reply-to-post.component.css'] // ← rätt här!
})

export class ReplyToPostComponent implements OnInit {

  postId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    // använd postId för att hämta inlägget
  }
}
