import 'reflect-metadata';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'app/storage/constants/store';
import { AppContainerStrategies } from 'app/container/enums';
import { initAppContainer } from 'app/container/functions';

(async function () {
	await initAppContainer(AppContainerStrategies.MOCK);
})();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
