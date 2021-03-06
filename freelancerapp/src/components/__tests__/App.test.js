import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import TitleBar from '../TitleBar';
import ReportContainer from '../ReportContainer'
import {shallow} from 'enzyme';
import axios from '../../util/axiosAPI';
import MockAdapter from 'axios-mock-adapter';


it('renders without crashing', () => {

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
    
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  shallow(<App />);
  shallow(<TitleBar />);
});


 