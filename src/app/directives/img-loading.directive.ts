import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[imgLoading]',
})
export class ImgLoadingDirective {
  private class = 'loading-animation';

  constructor(private elementRef: ElementRef<HTMLImageElement>) {
    elementRef.nativeElement.classList.add(this.class);
  }

  @HostListener('load')
  onLoad() {
    this.elementRef.nativeElement.classList.remove(this.class);
  }
  @HostListener('error')
  onError() {
    this.elementRef.nativeElement.classList.remove(this.class);
    this.elementRef.nativeElement.src =
      'https://i.pinimg.com/originals/fd/78/c4/fd78c47f2a009df65b5b5a46f4437399.png';
  }
}
