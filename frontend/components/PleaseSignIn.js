import SignIn from './SignIn';
import { useUser } from './User';

export default function PleaseSignIn({ children, returnNull }) {
  const me = useUser();
  if (!me && returnNull) return null;
  if (!me) return <SignIn />;
  return children;
}
