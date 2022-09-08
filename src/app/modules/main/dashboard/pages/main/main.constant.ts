import { DateUtils } from 'src/app/utils/date.util';
import {
  AverageStatus,
  ParsedAverageStatus,
} from '../../interfaces/average-status.interface';

export function parseAverageStatus(data: AverageStatus) {
  return <ParsedAverageStatus[]>[
    {
      title: 'Arrived',
      value: DateUtils.formatToTimer(data.arrived ?? 0),
      icon: 'flag',
    },
    {
      title: 'Assigned',
      value: DateUtils.formatToTimer(data.assigned ?? 0),
      icon: 'assignment',
    },
    {
      title: 'Canceled',
      value: data.canceled ?? 0,
      icon: 'close',
    },
    {
      title: 'Dispatched',
      value: DateUtils.formatToTimer(data.dispatched ?? 0),
      icon: 'motorcycle',
    },
    {
      title: 'Complete',
      value: DateUtils.formatToTimer(data.complete ?? 0),
      icon: 'done',
    },
    {
      title: 'Accepted',
      value: DateUtils.formatToTimer(data.accepted ?? 0),
      icon: 'receipt',
    },
    {
      title: 'Ready',
      value: DateUtils.formatToTimer(data.ready ?? 0),
      icon: 'rocket_launch',
    },
  ];
}
