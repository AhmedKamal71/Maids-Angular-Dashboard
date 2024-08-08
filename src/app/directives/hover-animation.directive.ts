import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverAnimation]',
  standalone: true,
})
export class HoverAnimationDirective {
  private originalBackgroundColor: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Capture the original background color on initialization
    this.originalBackgroundColor = this.el.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      '0 12px 24px rgba(0, 0, 0, 0.3)'
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      '#e9e9e99d'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.originalBackgroundColor
    );
  }
}
