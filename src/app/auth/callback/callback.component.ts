import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-callback',
  template: ``,
  styles: []
})

export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    let params = this.route.snapshot.fragment;

    const data = JSON.parse(
      '{"' +
        decodeURI(params)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
      );

    this.spotifyService.setToken(data.access_token);

    this.router.navigate(['/']);
  }
}
