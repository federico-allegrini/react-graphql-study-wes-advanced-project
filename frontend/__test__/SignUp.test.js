import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser();
const password = 'fed';

const mocks = [
  // Mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: { authenticatedItem: me },
    },
  },
];

describe('<Signup/>', () => {
  it('Render and matches snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('Calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    // Type into the boxes
    await userEvent.type(screen.getByPlaceholderText('Your Name'), me.name);
    await userEvent.type(
      screen.getByPlaceholderText('Your Email Address'),
      me.email
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    // Click the submit
    await userEvent.click(screen.getByText('Sign Up!'));
    await screen.findByText(
      `Signed up with ${me.email} - Please go ahead and Sign In!`
    );
  });
});

//*
// Problem for node module userEvent => "/node_modules/@testing-library/user-event"
// Search "require("@testing-library/dom");"
// Replace with "require("@testing-library/react/node_modules/@testing-library/dom");"
//*
