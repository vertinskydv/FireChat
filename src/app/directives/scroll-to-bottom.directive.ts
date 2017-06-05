import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[scrollToBottom]'
})
export class ScrollToBottomDirective {
  element: ElementRef;
  constructor(el: ElementRef) {
    this.element = el;
  }

  @Input()
  set ready(isReady: boolean) {
    let scrollableElement = this.element.nativeElement.parentElement;
    if (isReady) {
      setTimeout(()=>{scrollableElement.scrollTop = scrollableElement.scrollHeight;}, 1)
    }
  }

}
