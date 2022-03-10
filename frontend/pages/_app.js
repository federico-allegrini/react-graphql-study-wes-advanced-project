import Page from '../components/Page';

export default function MyApp({ Component, pageProps }) {
  return (
    <Page cool="Cool!">
      <Component {...pageProps} />
    </Page>
  );
}
