import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { pluginPagePlugin, PluginPagePage } from '../src/plugin';

createDevApp()
  .registerPlugin(pluginPagePlugin)
  .addPage({
    element: <PluginPagePage />,
    title: 'Root Page',
    path: '/plugin-page',
  })
  .render();
