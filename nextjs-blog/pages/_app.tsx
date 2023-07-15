import type { AppProps } from 'next/app'
 
/**
 * 
 * @param Component is the active page, so whenever you navigate between routes, Component will change to the new page. 
 *                  Therefore, any props you send to Component will be received by the page.
 * @param pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.
 * @returns 
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}