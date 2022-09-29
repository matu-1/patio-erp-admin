import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { handleRequest } from 'src/app/utils/handle-request';
import { OrderDto } from '../../interfaces/order.interface';
import { PublicService } from '../../services/public.service';

const TIME = 3000;

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
})
export class OrderTrackingComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  loader = new Loader({
    apiKey: 'AIzaSyD8aWuRDypYsJfeaBoOC3y9XATawNJ4Lrs',
    version: 'weekly',
  });
  @ViewChild('map') mapDiv!: ElementRef<HTMLDivElement>;
  map?: google.maps.Map;
  center: google.maps.LatLngLiteral = {
    lat: 40.72662762338239,
    lng: -73.9849855033782,
  };
  order?: OrderDto;
  driverIntervalTimer?: NodeJS.Timer;
  orderIntervalTimer?: NodeJS.Timeout;
  previusPositionDriver!: google.maps.LatLngLiteral;
  positions: google.maps.LatLngLiteral[] = [
    { lat: 40.739258, lng: -73.999147 },
    { lat: 40.740485, lng: -73.998321 },
    { lat: 40.739282, lng: -73.99551 },
    { lat: 40.741083, lng: -73.994233 },
    { lat: 40.739693, lng: -73.991031 },
    { lat: 40.74029, lng: -73.990567 },
    { lat: 40.738933, lng: -73.987389 },
    { lat: 40.737799, lng: -73.98825 },
    { lat: 40.737193, lng: -73.988671 },
    { lat: 40.737829, lng: -73.990178 },
    { lat: 40.73713, lng: -73.990331 },
    { lat: 40.736573, lng: -73.989065 },
  ].reverse(); //40.736415, -73.998834

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.orderIntervalTimer = setInterval(() => this.getOrder(), TIME);
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnDestroy(): void {
    this.driverIntervalTimer && clearInterval(this.driverIntervalTimer);
    this.orderIntervalTimer && clearInterval(this.orderIntervalTimer);
  }

  loadMap() {
    this.loader.load().then(() => {
      this.map = new google.maps.Map(this.mapDiv.nativeElement, {
        center: this.center,
        zoom: 15,
      });
      this.loadMarkers();
    });
  }

  async getOrder() {
    if (
      this.order &&
      (this.order.status == 'complete' || this.order.status == 'canceled')
    )
      return clearInterval(this.orderIntervalTimer);
    const res = await handleRequest(() => this.publicService.getOrder(1965));
    if (res) this.order = res.data;
  }

  async loadMarkers() {
    await this.getOrder();
    if (!this.order) return;
    //merchant
    const merchantInfo = new google.maps.InfoWindow({
      content: `${this.order.merchant.name}`,
    });
    const merchant = new google.maps.Marker({
      position: {
        lat: this.order.from_latitude,
        lng: this.order.from_longitude,
      },
      map: this.map,
      icon: 'assets/images/icons/tiendas.png',
      title: 'dfdfs',
    });
    merchant.addListener('click', () =>
      merchantInfo.open({
        anchor: merchant,
        map: this.map,
        shouldFocus: false,
      })
    );
    //client
    const clientInfo = new google.maps.InfoWindow({
      content: `${this.order.name_user} - ${this.order.phone_user}`,
    });
    const client = new google.maps.Marker({
      position: {
        lat: this.order.to_latitude,
        lng: this.order.to_longitude,
      },
      map: this.map,
      icon: 'assets/images/icons/casa.png',
    });
    client.addListener('click', () =>
      clientInfo.open({
        anchor: client,
        map: this.map,
        shouldFocus: false,
      })
    );
    //driver
    if (this.order.assignedDrivers) {
      const driverInfo = new google.maps.InfoWindow({
        content: `${this.order.assignedDrivers[0].id} - ${this.order.assignedDrivers[0].name}`,
      });
      this.previusPositionDriver = {
        // { lat: 40.737851, lng: -74.000209 },
        lat: 40.737851,
        lng: -74.000209,
      };
      const driver = new google.maps.Marker({
        position: this.previusPositionDriver,
        map: this.map,
        icon: 'assets/images/icons/repartidor.png',
      });
      console.log(driver);
      driver.addListener('click', () =>
        driverInfo.open({
          anchor: driver,
          map: this.map,
          shouldFocus: false,
        })
      );
      this.driverIntervalTimer = setInterval(
        () =>
          this.updatePositionDriver(this.order!.assignedDrivers![0].id, driver),
        TIME
      );
    }
  }

  async updatePositionDriver(id: number, marker: google.maps.Marker) {
    const res = await handleRequest(() => this.publicService.getDriver(id));
    if (res) {
      const { lat, lng } = this.positions.pop()!;
      marker.setPosition({
        lat: lat,
        lng: lng,
      });
      const markerImg = document.querySelector<HTMLImageElement>(
        'img[src="assets/images/icons/repartidor.png"]'
      );
      console.log(markerImg);
      markerImg!.style.transform = `rotate(${-this.angle(
        this.previusPositionDriver.lng,
        this.previusPositionDriver.lat,
        lng,
        lat
      )}deg)`; //rotateY(180deg)
      this.previusPositionDriver = { lat, lng };
    }
  }

  angle(cx: number, cy: number, ex: number, ey: number) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    console.log(theta);
    return theta;
  }
}
