// ExampleComponent.tsx
import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { PricingDashboard } from '../ExampleFetchComponent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Voltas pricing dashboard!">
      <HeaderLabel label="Volta" value="Java" />
      
    </Header>
    <Content>
      <ContentHeader title="DashBoard">
        <SupportButton>Pricing</SupportButton>
      </ContentHeader>
      
        <Grid item>
          <PricingDashboard /> {/* Use the imported PricingDashboard */}
        </Grid>
  
    </Content>
  </Page>
);
