import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const pricingdashboardPlugin = createPlugin({
  id: 'pricingdashboard',
  routes: {
    root: rootRouteRef,
  },
});

export const PricingdashboardPage = pricingdashboardPlugin.provide(
  createRoutableExtension({
    name: 'PricingdashboardPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
