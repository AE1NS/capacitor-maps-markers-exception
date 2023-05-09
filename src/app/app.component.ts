import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-root',
  template: '<capacitor-google-map #map></capacitor-google-map>',
  styles: [
    `
      capacitor-google-map {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map') mapContainer: ElementRef | undefined;

  async ngAfterViewInit() {
    const newMap = await GoogleMap.create({
      id: 'my-map',
      apiKey: 'API_KEY',
      element: this.mapContainer?.nativeElement,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 1,
      },
    });

    // Simulate 'navigate back' which destroys the map after 2 seconds
    setTimeout(async () => {
      await newMap.destroy();
    }, 2000);

    const markers = [];
    for (let i = 0; i < 2000; i++) {
      markers.push({
        coordinate: this._getRandomCoords(),
      });
    }
    await newMap.addMarkers(markers);
  }

  private _getRandomCoords() {
    const from = -180;
    const to = 180;
    const fixed = 3;
    return {
      lat: ((Math.random() * (to - from) + from).toFixed(fixed) as any) * 1,
      lng: ((Math.random() * (to - from) + from).toFixed(fixed) as any) * 1,
    };
  }
}
