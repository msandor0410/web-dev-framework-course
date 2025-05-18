import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { Subscription, forkJoin } from 'rxjs';
import { Survey } from '../../models/survey.model';
import { CommonModule } from '@angular/common';
import { SurveyCardComponent } from '../survey-card/survey-card.component';
import { Router } from '@angular/router';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';

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
export class SurveyListComponent implements OnInit, OnDestroy {
  surveys: (Survey & { creatorName: string })[] = [];
  snapshotHistory: QueryDocumentSnapshot<DocumentData>[] = [];
  currentPageIndex = 0;
  pageSize = 5;
  private subscription = new Subscription();
  mode: 'all' | 'paged' = 'paged';
  isLastPage = false;
  isLoading = false;

  deleteCount = 0;
  readonly maxDeletesPerSession = 2;

  constructor(
    private surveyService: SurveyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.mode === 'all') {
      this.loadAllSurveys();
    } else {
      this.loadPage(0);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  switchMode(): void {
  this.mode = this.mode === 'paged' ? 'all' : 'paged'; // EZ A LÉNYEG!!!
  this.subscription.unsubscribe();
  this.subscription = new Subscription();
  this.surveys = [];
  this.snapshotHistory = [];
  this.currentPageIndex = 0;
  this.isLastPage = false;
  this.isLoading = false;
  this.ngOnInit();
}


  loadAllSurveys(): void {
    this.isLoading = true;
    const sub = this.surveyService.getSurveys().subscribe(surveys => {
      const enriched = surveys.map(survey =>
        this.authService.getUserFullName(survey.creatorId || '').then(name => ({
          ...survey,
          creatorName: name || 'Ismeretlen'
        }))
      );
      forkJoin(enriched).subscribe(full => {
        this.surveys = full;
        this.isLoading = false;
      });
    });
    this.subscription.add(sub);
  }

  loadPage(direction: 1 | -1 | 0): void {
    if (this.isLoading) return;
    this.isLoading = true;

    let reference: QueryDocumentSnapshot<DocumentData> | null = null;

    if (direction === 1 && this.currentPageIndex > 0) {
      reference = this.snapshotHistory[this.currentPageIndex - 1];
    } else if (direction === -1 && this.currentPageIndex > 2) {
      reference = this.snapshotHistory[this.currentPageIndex - 3];
    }

    const sub = this.surveyService.getSurveysPaged(reference, this.pageSize).subscribe(result => {
      const { surveys, lastVisible } = result;
      const enriched = surveys.map(survey =>
        this.authService.getUserFullName(survey.creatorId || '').then(name => ({
          ...survey,
          creatorName: name || 'Ismeretlen'
        }))
      );

      forkJoin(enriched).subscribe(full => {
        this.surveys = full;
        if (direction === 1) {
          if (lastVisible && !this.snapshotHistory.includes(lastVisible)) {
            this.snapshotHistory.push(lastVisible);
          }
          this.currentPageIndex++;
        } else if (direction === -1) {
          this.currentPageIndex--;
        } else {
          this.snapshotHistory = lastVisible ? [lastVisible] : [];
          this.currentPageIndex = 1;
        }

        this.isLastPage = surveys.length < this.pageSize;
        this.isLoading = false;
      });
    });
    this.subscription.add(sub);
  }

  nextPage(): void {
    if (!this.isLastPage && !this.isLoading) {
      this.loadPage(1);
    }
  }

  previousPage(): void {
    if (this.currentPageIndex > 1 && !this.isLoading) {
      this.loadPage(-1);
    }
  }

  onDeleteSurvey(id: string): void {
    if (this.deleteCount >= this.maxDeletesPerSession) {
      alert('❌ Egy session alatt legfeljebb 2 kérdőívet törölhetsz.');
      return;
    }

    if (confirm('Biztosan törölni szeretnéd ezt a kérdőívet?')) {
      this.surveyService.deleteSurvey(id).subscribe(() => {
        this.surveys = this.surveys.filter(s => s.id !== id);
        this.deleteCount++;
      });
    }
  }

  onSurveySelected(survey: Survey): void {
    this.router.navigate(['/survey', survey.id]);
  }

  trackByFn(index: number, survey: Survey): string {
    return survey.id;
  }
}
