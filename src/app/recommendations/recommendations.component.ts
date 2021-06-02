import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styles: [
  ]
})
export class RecommendationsComponent implements OnInit {
  songs: any;
  update: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getCurrentSong()
      .subscribe(data => {
        this.spotifyService.getRecommendations(data)
          .subscribe(data => {
            this.songs = data;
          });
      });
  }

  refreshRecommendations() {
    this.spotifyService.getCurrentSong()
      .subscribe(data => {
        this.spotifyService.getRecommendations(data)
          .subscribe(data => {            
            this.songs = data;
          });
      });
  }

  playSong(uri: string) {
    this.spotifyService.playSong(uri)
      .subscribe(data => { });
  }
}
