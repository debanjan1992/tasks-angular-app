import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickedOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener("document:click", ["$event.target"])
  onClick(target: any) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.clickedOutside.emit();
    }
  }

}
