import { Component, OnInit } from '@angular/core';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { DateUtils } from 'src/app/utils/date.util';
import { ExcelUtils } from 'src/app/utils/excel.util';
import { handleRequest } from 'src/app/utils/handle-request';
import { deliveryDetailSchema } from '../../configs/form-schema';
import { deliveryDetailColumns } from '../../configs/table-columns';
import { DeliveryDetail } from '../../interfaces/delivery-detail.interface';
import { ReportService } from '../../services/report.service';
import { WeekType } from 'src/app/utils/utils';

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
    this.resetForm();
    this.getDeliveryDetail();
  }

  resetForm() {
    const { start, end } = this.form.value.week as WeekType;
    this.form.patchValue({ start, end });
    this.form.get('week')?.valueChanges.subscribe(({ start, end }) => {
      this.form.patchValue({ start, end });
    });
  }

  async getDeliveryDetail() {
    const value = this.form.value;
    this.deliveryDetailList = undefined;
    const res = await handleRequest(() =>
      this.reportService.getDeliveryDetail({
        ...value,
        start: DateUtils.getMinHour(value.start),
        end: DateUtils.getMaxHour(value.end),
      })
    );
    if (res) this.deliveryDetailList = res.data;
  }

  filter() {
    this.getDeliveryDetail();
  }

  downloadExcel() {
    ExcelUtils.download(this.deliveryDetailList!, 'delivery detail');
  }

  get amount() {
    return this.deliveryDetailList?.reduce(
      (acc, cur) => acc + Number(cur.monto),
      0
    );
  }
}
