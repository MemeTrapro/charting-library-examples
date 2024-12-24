import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import configureDatafeed from './datafeed';
import { subscribeOnStream, unsubscribeFromStream } from './streaming';

function App({uri = 'index.html'}): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{uri}}
        javaScriptEnabled={true}
        allowFileAccessFromFileURLs={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={() => true}
        onMessage={(event) => {
          // Log messages sent from the WebView
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
}

export function AndroidApp(): JSX.Element {
  return <App uri={'file:///android_asset/index.html'} />;
}

export function IOsApp(): JSX.Element {
  return <App uri={'index.html'} />;
}