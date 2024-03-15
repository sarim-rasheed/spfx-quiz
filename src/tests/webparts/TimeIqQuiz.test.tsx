// import * as React from 'react';
// import { mount, shallow } from 'enzyme';
// import TimeIqQuiz from '../../webparts/timeIqQuiz/components/TimeIqQuiz';
// import { ITimeIqQuizProps } from '../../webparts/timeIqQuiz/components/ITimeIqQuizProps';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// describe('TimeIqQuiz', () => {
//   const defaultProps: ITimeIqQuizProps = {
//     webUrl: '',
//     context: {},
//   };

//   it('renders without crashing', () => {
//     shallow(<TimeIqQuiz {...defaultProps} />);
//   });

//   it('renders Form component by default', () => {
//     const wrapper = shallow(<TimeIqQuiz {...defaultProps} />);
//     expect(wrapper.find(Form)).toHaveLength(1);
//   });

//   it('renders Quiz component when quiz starts', () => {
//     const wrapper = mount(<TimeIqQuiz {...defaultProps} />);
//     wrapper.setState({ showForm: false, showQuiz: true });
//     expect(wrapper.find(Quiz)).toHaveLength(1);
//   });

//   it('renders action button with correct label', () => {
//     const wrapper = shallow(<TimeIqQuiz {...defaultProps} />);
//     expect(wrapper.find('button.actionButton').text()).toEqual('Get started');
//   });
// });
