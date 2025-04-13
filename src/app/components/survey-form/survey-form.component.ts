import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { QuestionService } from '../../services/question.service';
import { Survey } from '../../models/survey.model';
import { Question } from '../../models/question.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule ],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  surveyForm!: FormGroup;
  questionControl = new FormControl('');
  tagControl = new FormControl('');
  questions: Question[] = [];
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.authService.currentUser.subscribe(user => {
      if (!user) {
        this.router.navigate(['/profile']);
      }
    });
  }

  addQuestion(): void {
    const text = this.questionControl.value?.trim();
    if (text) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text,
        type: 'text',
        options: []
      };
      this.questions.push(newQuestion);
      this.questionControl.reset();
    }
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  addTag(): void {
    const tag = this.tagControl.value?.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagControl.reset();
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  onSubmit(): void {
    if (this.surveyForm.valid) {
      const user = this.authService.currentUser.value;
      if (user) {
        const userDocRef = doc(this.firestore, 'users', user.uid);
        getDoc(userDocRef).then(docSnap => {
          const fullName = docSnap.exists() ? docSnap.data()['fullName'] : 'Ismeretlen';

          const surveyId = Date.now().toString();
          const newSurvey: Survey = {
            id: surveyId,
            title: this.surveyForm.value.title,
            description: this.surveyForm.value.description,
            creatorId: user.uid,
            creatorName: fullName,
            questionIds: this.questions.map(q => q.id),
            tags: this.tags
          };

          Promise.all([
            this.surveyService.saveSurvey(newSurvey),
            this.questionService.saveQuestions(this.questions, surveyId)
          ]).then(() => {
            alert('Kérdőív és kérdések elmentve!');
            this.router.navigate(['/survey-list']);
          }).catch(err => {
            console.error(err);
            alert('Hiba történt a mentés során!');
          });
        });
      }
    }
  }
}
