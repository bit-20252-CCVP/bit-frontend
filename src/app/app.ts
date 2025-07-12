import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './componentes/compartido/navigation/navigation';
import { Header } from './componentes/compartido/header/header';
import { Footer } from './componentes/compartido/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Navigation, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
