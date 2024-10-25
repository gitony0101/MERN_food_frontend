import type { OrderStatus } from '../types';

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: 'Placed', value: 'placed', progressValue: 0 },
  {
    label: 'Awaiting Restaurant Confirmation',
    value: 'paid',
    progressValue: 10,
  },
  { label: 'In Progress', value: 'inProgress', progressValue: 42 },
  { label: 'Out for Delivery', value: 'outForDelivery', progressValue: 66 },
  { label: 'Dilivered', value: 'delivered', progressValue: 100 },
];
