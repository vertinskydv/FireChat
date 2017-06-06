import { Directive, HostListener, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[infiniteScroller]'
})
export class InfiniteScrollerDirective {
  prevScrollValue: number = -1;
  currentScrollValue: number = -1;
  lastMessageId: number = -1;

  @Input()
  set firstMessage(val: number) {
    this.lastMessageId = val;
    // console.log("FMID " + val);
  }

  @HostListener('scroll') scrollings(){
    this.prevScrollValue = this.currentScrollValue;
    this.currentScrollValue = this.elm.nativeElement.scrollTop;
    if ((this.currentScrollValue === 0) && (this.prevScrollValue > 0) && (this.lastMessageId > 0)) {
      // console.log("Get Data!");
    }
    // console.log('--------');
    // console.log(this.prevScrollValue);
    // console.log(this.currentScrollValue);
  }
   constructor(private elm: ElementRef) {
  }
}
