import { Component, HostListener } from '@angular/core';
import { Event, RouterOutlet } from '@angular/router';
import { NavigationStart, Router, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';
import { NgIf, DatePipe } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FooterComponent } from 'src/app/components/template/footer/footer.component';
import { NavComponent } from 'src/app/components/template/nav/nav.component';
import { HeaderComponent } from 'src/app/components/template/header/header.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgIf, FooterComponent, NavComponent, DatePipe, RouterOutlet, HeaderComponent]
})

export class AppComponent {
  title = 'lisweb-ng-frontend';
  loadedDateTime: Date = new Date(Date.now());
  loading = false;

  constructor(private router: Router) {
    this.router.events
    .pipe(untilDestroyed(this))
    .subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // Para Atualizar a data do relatorio antes da impressao
  @HostListener("window:beforeprint", [])
  doBeforePrint() {
    this.loadedDateTime = new Date(Date.now())
  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
