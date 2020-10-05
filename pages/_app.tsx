import React from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import stores from '../src/stores';
import App from 'next/app';
import 'styles/Default.scss';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={stores}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="shortcut icon" href="/icon/Logo.png" />
					<title>CoCode</title>
				</Head>
				<Component {...pageProps} />
			</Provider>
		);
	}
}
