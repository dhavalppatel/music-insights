export interface ISong {
    trackId?: string,
    artistId?: string,
    albumId?: string,
    albumArtUrl?: string,
    genre?: string,
    title: string,
    artists: string[],
    album: string
}