import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const pluginPagePlugin = createPlugin({
  id: 'plugin-page',
  routes: {
    root: rootRouteRef,
  },
});

export const PluginPagePage = pluginPagePlugin.provide(
  createRoutableExtension({
    name: 'PluginPagePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
