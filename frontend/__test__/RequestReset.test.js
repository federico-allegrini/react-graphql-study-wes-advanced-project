import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'federico.allegrini.dev@gmail.com';
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset/>', () => {
  it('Render and matches snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls the mutation when submitted', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // Type into the email box
    await userEvent.type(
      screen.getByPlaceholderText('Your Email Address'),
      email
    );
    // Click submit
    await userEvent.click(screen.getByText('Request Reset!'));
    const success = await screen.findByText(
      'Success! Check your email for a link!'
    );
    expect(success).toBeInTheDocument();
  });
});
