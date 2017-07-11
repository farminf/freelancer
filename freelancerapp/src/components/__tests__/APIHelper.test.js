import React from 'react';
import ReactDOM from 'react-dom';
import APIHelper from '../../util/APIHelper'

jest.mock('../__mockdata__/test_api')

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<DataTable />, div);
// });

// The exact same test using async/await
describe('#updateProjects() using async/await', () => {
  it('should load project data', async () => {
    const data = await APIHelper.getProjects()
    expect(data).toBeDefined()
  })
})

// The exact same test using async/await
describe('#updateItems() using async/await', () => {
  it('should load project data', async () => {
    const data = await APIHelper.getItems()
    expect(data).toBeDefined()
  })
})