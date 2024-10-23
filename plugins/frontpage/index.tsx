import React from 'react';
import {
  createFrontendPlugin,
  PageBlueprint,
} from '@backstage/frontend-plugin-api';

const myPage = PageBlueprint.make({
  params: {
    defaultPath: '/my-page',
    loader: () => import('./MyPage').then(m => <m.MyPage />),
  },
});

export default createFrontendPlugin({
  id: 'my-plugin',
  extensions: [myPage],
});
