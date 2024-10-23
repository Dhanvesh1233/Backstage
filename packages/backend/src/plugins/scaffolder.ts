// import { createRouter } from '@backstage/plugin-scaffolder-backend';
// import { createGithubRepoPushAction } from '@backstage/plugin-scaffolder-backend-module-github';
// import { ScmIntegrations } from '@backstage/integration';
// import { Logger } from 'winston';
// import { Config } from '@backstage/config';
// import { PluginEndpointDiscovery } from '@backstage/backend-common';
// import { IdentityApi } from '@backstage/plugin-auth-node';
// import {DatabaseService} from '@backstage/plugin-scaffolder-backend';
// import { CatalogApi } from '@backstage/catalog-client'; // Adjust the import based on your project structure

// export default async function createPlugin({
//   logger,
//   config,
//   reader, // Make sure UrlReader is correctly imported
//   permissions, // Ensure this is valid in the current API
//   discovery,
//   identity,
//   database, // Ensure you have an instance of DatabaseService
//   catalogClient, // Ensure you have an instance of CatalogApi
// }: {
//   logger: Logger;
//   config: Config;
//   reader: any; // Adjust the type according to current implementation
//   permissions: any; // Adjust the type according to current implementation
//   discovery: PluginEndpointDiscovery;
//   identity: IdentityApi;
//   database: DatabaseService; // Ensure this is correctly defined
//   catalogClient: CatalogApi; // Ensure this is correctly defined
// }) {
//   const integrations = ScmIntegrations.fromConfig(config);

//   const router = await createRouter({
//     logger,
//     config,
//     reader,
//     actions: [
//       createGithubRepoPushAction({
//         integrations,
//         config,
//         // Removed logger from here
//       }),
//     ],
//     permissions,
//     discovery,
//     identity,
//     database, // Pass the instantiated DatabaseService
//     catalogClient, // Pass the instantiated CatalogApi
//   });

//   return router;
// }
