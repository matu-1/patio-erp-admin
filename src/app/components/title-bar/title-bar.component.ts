import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-bar[title]',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent {
  @Input() title!: string;

  constructor() {}
}
