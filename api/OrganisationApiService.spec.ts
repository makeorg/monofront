// import { ApiService } from 'Shared/api/ApiService';
// import { PROPOSALS_LISTING_LIMIT } from 'Shared/constants/proposal';
// import {
//   OrganisationApiService,
//   ORGANISATIONS_PATH,
//   ORGANISATION_PROPOSALS_PATH,
//   ORGANISATION_VOTES_PATH,
// } from './OrganisationApiService';

// jest.mock('./ApiService');

// describe('OrganisationService', () => {
//   beforeEach(() => {
//     ApiService.callApi.mockClear();
//     jest.spyOn(ApiService, 'callApi');
//   });

//   describe('getOrganisations', () => {
//     it('must call ApiService.callApi', async () => {
//       await OrganisationApiService.getOrganisations('foo');
//       expect(ApiService.callApi).toHaveBeenNthCalledWith(
//         1,
//         ORGANISATIONS_PATH,
//         {
//           method: 'GET',
//           params: {
//             slug: 'foo',
//           },
//         }
//       );
//     });
//   });

//   describe('getOrganisationProposals', () => {
//     it('must call ApiService.callApi', async () => {
//       await OrganisationApiService.getOrganisationProposals('foo');
//       expect(ApiService.callApi).toHaveBeenNthCalledWith(
//         1,
//         ORGANISATION_PROPOSALS_PATH.replace(':organisationId', 'foo'),
//         {
//           method: 'GET',
//           params: {
//             sort: 'createdAt',
//             order: 'desc',
//             seed: null,
//             limit: PROPOSALS_LISTING_LIMIT,
//             skip: 0,
//           },
//         }
//       );
//     });
//   });

//   describe('getOrganisationsVotes', () => {
//     it('must call ApiService.callApi', async () => {
//       await OrganisationApiService.getOrganisationVotes('foo');
//       expect(ApiService.callApi).toHaveBeenNthCalledWith(
//         1,
//         ORGANISATION_VOTES_PATH.replace(':organisationId', 'foo'),
//         {
//           method: 'GET',
//           params: {
//             votes: 'agree,disagree',
//             seed: null,
//             limit: PROPOSALS_LISTING_LIMIT,
//             skip: 0,
//           },
//         }
//       );
//     });
//   });
// });
