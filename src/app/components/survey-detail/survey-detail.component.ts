import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SurveyService } from '../../services/survey.service';
import { QuestionService } from '../../services/question.service';
import { Survey } from '../../models/survey.model';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-survey-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {
  survey: Survey | null = null;
  questions: Question[] = [];

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId) {
      this.surveyService.getSurveyById(surveyId).then(survey => {
        this.survey = survey;
        if (survey && survey.questionIds?.length) {
          this.questionService.getQuestionsByIds(survey.questionIds).then(questions => {
            this.questions = questions;
          });
        }
      });
    }
  }
}
