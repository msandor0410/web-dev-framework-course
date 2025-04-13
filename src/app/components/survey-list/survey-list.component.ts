import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Survey } from '../../models/survey.model';
import { CommonModule } from '@angular/common';
import { SurveyCardComponent } from '../survey-card/survey-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [
    CommonModule,
    SurveyCardComponent
  ],
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {
  surveys$!: Observable<(Survey & { creatorName: string })[]>;

  constructor(
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.surveys$ = this.surveyService.getSurveys().pipe(
      switchMap(surveys => {
        const enrichedSurveys = surveys.map(survey => {
          const creatorId = survey.creatorId || '';
          return this.authService.getUserFullName(creatorId).then(name => ({
            ...survey,
            creatorName: name || 'Ismeretlen'
          }));
        });
        return forkJoin(enrichedSurveys);
      })
    );
  }
  

  onSurveySelected(survey: Survey): void {
    this.router.navigate(['/survey', survey.id]);
  }

  trackByFn(index: number, survey: Survey): string {
    return survey.id;
  }
}
