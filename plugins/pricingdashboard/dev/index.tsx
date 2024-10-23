import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { pricingdashboardPlugin, PricingdashboardPage } from '../src/plugin';

createDevApp()
  .registerPlugin(pricingdashboardPlugin)
  .addPage({
    element: <PricingdashboardPage />,
    title: 'Root Page',
    path: '/pricingdashboard',
  })
  .render();
