import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'M.Tech Admission 2020',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Department of Mathematics, VNIT Nagpur is organizing “International Conference on Mathematical and Computational Techniques in Pure and Applied Sciences (ICMCTPAS 2020)” during 31st July to 2nd Aug, 2020',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'The Department of Architecture & Planning is organizing a national conference on “Emerging Challenges, Opportunities and Innovations in Urban Planning and Design” on August 8-9, 2020.',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Department of Electrical Engineering, VNIT Nagpur is organizing IEEE International Conference on Smart Technologies for Power, Energy and Control (STPEC-2020), during 25-26 Sept, 2020.',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Department of Civil Engineering is organizing an International Conference on Advances in Civil Engineering ACE 2020',
    updatedAt: moment().subtract(9, 'hours')
  }
];
