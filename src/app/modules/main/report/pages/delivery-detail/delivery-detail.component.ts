import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { deliveryDetailSchema } from '../../configs/form-schema';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss'],
})
export class DeliveryDetailComponent implements OnInit {
  deliveryDetailSchema = deliveryDetailSchema;
  form = buildform(deliveryDetailSchema);

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getDeliveryDetail();
  }

  async getDeliveryDetail() {
    console.log('init res');
    const value = this.form.value;
    const res = await handleRequest(() =>
      this.reportService.getDeliveryDetail({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) console.log('res', res);
  }

  filter() {
    this.getDeliveryDetail();
  }
}
