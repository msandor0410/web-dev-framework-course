import { Pipe, PipeTransform } from '@angular/core';
import { Survey } from '../models/survey.model';

@Pipe({
  name: 'ownSurvey',
  standalone: true
})
export class OwnSurveyPipe implements PipeTransform {
  transform(surveys: Survey[], uid: string): Survey[] {
    return surveys.filter(s => s.creatorId === uid);
  }
}
