import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    public constructor(
        private readonly sanitizer: DomSanitizer
    ) { }

    public useYoutubeVideo(
        url: string
    ): SafeResourceUrl {
        const regex: any = /youtu[a-z]*?.[a-z]{2,3}\/(watch\?v=)?([a-zA-Z0-9\_\-]+)/gm;
        const result: any = regex.exec(url);

        return this.sanitizer.bypassSecurityTrustResourceUrl(
            result.length >= 1
                ? `https://www.youtube.com/embed/${ result[ result.length - 1 ] }`
                : url
        );
    }
}
