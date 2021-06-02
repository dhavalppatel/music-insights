import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  token: String = "";
  isAuthed: boolean = false;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.token = this.spotifyService.getToken();
    this.isAuthed = this.spotifyService.getAuth();
  }

  requestAuth() {
    this.spotifyService.requestAuth();
  }
}

