import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Survey } from '../../models/survey.model';
import { NameShortenPipe } from '../../pipes/name-shorten.pipe';

@Component({
  selector: 'app-survey-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, NameShortenPipe],
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.scss']
})
export class SurveyCardComponent {
  @Input() survey!: Survey & { creatorName: string };
  @Output() select = new EventEmitter<Survey>();

  onClick(): void {
    this.select.emit(this.survey);
  }
}
