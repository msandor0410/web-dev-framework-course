import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameShorten',
  standalone: true
})
export class NameShortenPipe implements PipeTransform {
  transform(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0];  // Ha csak vezetéknév van
    return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;  // Pl. M. Sándor
  }
}
