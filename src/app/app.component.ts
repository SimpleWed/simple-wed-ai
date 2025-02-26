import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DarkmodeService } from './services/darkmode/darkmode.service';
import { getAuth } from 'firebase/auth';
import { AuthModule } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, AuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  darkmodeService = inject(DarkmodeService);
  title = 'simplewed';
}
