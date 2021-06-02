import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  isAuthed: boolean = false;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    console.log(this.isAuthed);
    
    this.isAuthed = this.spotifyService.getAuth();
  }

  logout(): void {
    this.spotifyService.logout();
  }

}
