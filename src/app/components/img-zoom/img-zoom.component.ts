import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.scss']
})
export class ImgZoomComponent implements OnInit {
  @Input() src!: string;
  @Input() alt?: string;
  @Input() width?: string | number;
  @Input() height?: string | number;

  constructor() { }

  ngOnInit(): void {
  }

  openImage(){
    window.open(this.src, "_bank");
  }

}
