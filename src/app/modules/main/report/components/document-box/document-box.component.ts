import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../../interfaces/driver.interface';

@Component({
  selector: 'app-document-box',
  templateUrl: './document-box.component.html',
  styleUrls: ['./document-box.component.scss']
})
export class DocumentBoxComponent implements OnInit {
  @Input() document!: Document

  constructor() { }

  ngOnInit(): void {
  }

}
