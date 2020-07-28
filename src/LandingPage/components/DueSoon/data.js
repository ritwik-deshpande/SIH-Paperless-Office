import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    title: 'ID1 - Workflow Name1',
    subtitle1: 'Last Approved by Ravindra Keskar',
    subtitle2: 'Updated On : Jul 28 at 16:35, 2020',
    type: 'owner' /* User's own initiated Workflow */
  },
  {
    id: uuid(),
    title: 'ID2 - Workflow Name2',
    subtitle1: 'Waiting for your Approval',
    subtitle2: 'Updated 5 days ago',
    type: 'approver' /* Workflow needs this user's approval */
  },
  {
    id: uuid(),
    title: 'ID3 - Workflow Name3',
    subtitle1: 'Waiting for your Approval',
    subtitle2: 'Updated a while ago',
    type: 'approver' /* Workflow needs this user's approval */
  },
  {
    id: uuid(),
    title: 'ID4 - Workflow Name4',
    subtitle1: 'Last Approved by Umesh Deshpande',
    subtitle2: 'Updated On : Jul 26 at 15:26, 2020',
    type: 'owner' /* User's own initiated Workflow */
  },
  {
    id: uuid(),
    title: 'ID5 - Workflow Name5',
    subtitle1: 'Waiting for your Approval',
    subtitle2: 'Updated 14 hours ago',
    type: 'approver' /* Workflow needs this user's approval */
  },
];
