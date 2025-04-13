import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';
import { OwnSurveyPipe } from '../../pipes/own-survey.pipe';
import { NameShortenPipe } from '../../pipes/name-shorten.pipe';
import { User as AppUser } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    OwnSurveyPipe,
    NameShortenPipe
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userEmail: string = '';
  fullName: string = '';
  currentUid: string = '';
  surveys: Survey[] = [];
  userData: AppUser | null = null;

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userEmail = user.email ?? '';
        this.currentUid = user.uid;

        this.authService.getUserFullName(user.uid).then(name => {
          this.fullName = name;
          this.userData = {
            uid: user.uid,
            email: user.email ?? '',
            fullName: name
          };
        });

        this.loadUserSurveys();
      }
    });
  }

  loadUserSurveys(): void {
    this.surveyService.getSurveys().subscribe(surveys => {
      this.surveys = surveys;
    });
  }
}
