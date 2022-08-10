import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent implements AfterViewInit {
  @Input() open: boolean = false;
  @Input() appentTo = 'body';
  @Output() click = new EventEmitter();
  @ViewChild('backdrop') backdrop!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    document.querySelector(this.appentTo)?.append(this.backdrop.nativeElement);
  }

  onClick() {
    this.click.emit();
  }
}
