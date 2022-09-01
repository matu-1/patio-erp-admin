import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { deliveryDetailSchema } from '../../configs/form-schema';
import { deliveryDetailColumns } from '../../configs/table-columns';
import { DeliveryDetail } from '../../interface/delivery-detail.interface';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss'],
})
export class DeliveryDetailComponent implements OnInit {
  deliveryDetailSchema = deliveryDetailSchema;
  deliveryDetailColumns = deliveryDetailColumns;
  form = buildform(deliveryDetailSchema);
  deliveryDetailList?: DeliveryDetail[];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getDeliveryDetail();
  }

  async getDeliveryDetail() {
    const value = this.form.value;
    this.deliveryDetailList = undefined;
    const res = await handleRequest(() =>
      this.reportService.getDeliveryDetail({
        ...value,
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.deliveryDetailList = res.data;
  }

  filter() {
    this.getDeliveryDetail();
  }

  downloadExcel(){
    ExcelUtils.download(this.deliveryDetailList!, 'delivery detail');
  }
}
