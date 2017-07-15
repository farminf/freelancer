import React from 'react';
import ReactDOM from 'react-dom';
import InsertContainer from '../InsertContainer';
import DataTable from '../DataTable';
import {
  shallow
} from 'enzyme';
import axios from '../../util/axiosAPI';
import MockAdapter from 'axios-mock-adapter';




describe('getProjects api call ', () => {
  it('Should return data from response', () => {
    let mock = new MockAdapter(axios);

    mock.onGet('/projects').reply(200, {
      data: {
        result: [{
            "name": "project_2"
          },
          {
            "name": "project_1"
          }
        ]
      }
    });

    mock.onGet('/items').reply(200, {
      data: {
        result: [{
            "end": "1499209020",
            "id": "595ba7b05deb552457599838",
            "project": "project_2",
            "start": "1499205600"
          },
          {
            "end": "1499137200",
            "id": "595baac55deb55245759983a",
            "project": "project_1",
            "start": "1499126400"
          }
        ]
      }
    });

    shallow(<InsertContainer/>);
  });

  it('renders without crashing', () => {
    shallow( <DataTable /> );
  });

});