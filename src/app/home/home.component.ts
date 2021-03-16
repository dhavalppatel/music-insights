import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  currentSong : any;

  

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.token = this.spotifyService.getToken();
    this.isAuthed = this.spotifyService.getIsAuthed();
    if(this.isAuthed) {
      this.spotifyService.getCurrentSong()
        .subscribe(data => { 
          this.currentSong = data, console.log(this.currentSong);
         });
    }
  }

  requestAuth() {
    this.spotifyService.requestAuth();
  }
}
