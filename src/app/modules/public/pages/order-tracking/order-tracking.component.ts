import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { handleRequest } from 'src/app/utils/handle-request';
import { OrderDto } from '../../interfaces/order.interface';
import { PublicService } from '../../services/public.service';
import { MAP_STYLES } from './order-tracking.constants';

const TIME = 10000;
const DRIVER_ICON = 'assets/images/icons/repartidor.png';

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
  // center = {lat: 40.72662762338239,lng: -73.9849855033782,}; 1965
  order?: OrderDto;
  driverIntervalTimer?: NodeJS.Timer;
  orderIntervalTimer?: NodeJS.Timeout;
  previusPositionDriver!: google.maps.LatLngLiteral;
  photoUrl =
    'https://static.vecteezy.com/system/resources/previews/008/420/425/original/cute-penguin-wearing-earmuff-cartoon-icon-illustration-animal-winter-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg';
  iconToggle = 'expand_more'; //expand_less

  constructor(
    private publicService: PublicService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderIntervalTimer = setInterval(() => this.getOrder(), TIME);
    this.addChat();
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnDestroy(): void {
    this.driverIntervalTimer && clearInterval(this.driverIntervalTimer);
    this.orderIntervalTimer && clearInterval(this.orderIntervalTimer);
  }

  loadMap() {
    const query = this.activatedRoute.snapshot.queryParams;
    const lat = query.lat ? Number(query.lat) : 0;
    const lng = query.lng ? Number(query.lng) : 0;
    this.loader.load().then(() => {
      this.map = new google.maps.Map(this.mapDiv.nativeElement, {
        center: { lat, lng },
        zoom: 15,
        styles: MAP_STYLES.ULTRA_LIGHT_LABELS_MAP_STYLE,
      });
      this.loadMarkers();
    });
  }

  get hasError() {
    return this.publicService.hasError;
  }

  async getOrder() {
    if (this.hasClear()) return clearInterval(this.orderIntervalTimer);
    const id = this.activatedRoute.snapshot.params.id;
    const res = await handleRequest(() => this.publicService.getOrder(id));
    if (res) this.order = res.data;
  }

  hasClear() {
    return (
      (this.order &&
        (this.order.status == 'complete' || this.order.status == 'canceled')) ||
      this.hasError.getOrder
    );
  }

  async loadMarkers() {
    await this.getOrder();
    if (!this.order) return;
    const latLngBounds = new google.maps.LatLngBounds();
    //merchant
    const merchantInfo = new google.maps.InfoWindow({
      content: `${this.order.merchant.name}`,
    });
    const merchantPosition = {
      lat: this.order.from_latitude,
      lng: this.order.from_longitude,
    };
    const merchant = new google.maps.Marker({
      position: merchantPosition,
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
    const clientPosition = {
      lat: this.order.to_latitude,
      lng: this.order.to_longitude,
    };
    const client = new google.maps.Marker({
      position: clientPosition,
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
        lat: this.order.assignedDrivers[0].latitude,
        lng: this.order.assignedDrivers[0].longitude,
      };
      const driver = new google.maps.Marker({
        position: this.previusPositionDriver,
        map: this.map,
        icon: DRIVER_ICON,
      });
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
      latLngBounds.extend(this.previusPositionDriver);
    }
    //Limit by coordinates
    latLngBounds.extend(clientPosition);
    latLngBounds.extend(merchantPosition);
    this.map?.fitBounds(latLngBounds);
  }

  async updatePositionDriver(id: number, marker: google.maps.Marker) {
    if (this.hasClear()) return clearInterval(this.driverIntervalTimer);
    const res = await handleRequest(() => this.publicService.getDriver(id));
    if (res) {
      const lat = Number(res.data.last_latitude);
      const lng = Number(res.data.last_longitude);
      marker.setPosition({
        lat: lat,
        lng: lng,
      });
      const markerImg = document.querySelector<HTMLImageElement>(
        `img[src="${DRIVER_ICON}"]`
      );
      const angle = -this.angle(
        this.previusPositionDriver.lng,
        this.previusPositionDriver.lat,
        lng,
        lat
      );
      markerImg!.style.transform = `rotate(${angle}deg) ${
        Math.abs(angle) > 90 ? 'rotateX(180deg)' : ''
      }`;
      this.previusPositionDriver = { lat, lng };
    }
  }

  angle(cx: number, cy: number, ex: number, ey: number) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }

  toggle(orderStatusEle: HTMLDivElement) {
    if (orderStatusEle.classList.contains('order-close')) {
      orderStatusEle.classList.remove('order-close');
      this.iconToggle = 'expand_more';
    } else {
      orderStatusEle.classList.add('order-close');
      this.iconToggle = 'expand_less';
    }
  }

  sendMessage(order: OrderDto) {
    const link = `http://api.whatsapp.com/send?phone=${
      order.assignedDrivers![0].phoneNumber
    }&text=Holaa`;
    window.open(link, '_blank');
  }

  addChat() {
    //<script src="//code.jivosite.com/widget/cWUgmH4bLa" async></script>
    const body = document.body;
    const jivochat = document.createElement('script');
    jivochat.async = true;
    jivochat.src = '//code.jivosite.com/widget/cWUgmH4bLa';
    body.appendChild(jivochat);
  }
}
