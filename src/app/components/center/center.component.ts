import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {
  @Input() minHeight?: string = 'auto';

  constructor(private ref: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.minHeight = this.minHeight!;
  }
}
