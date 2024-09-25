import { registerRootComponent } from 'expo';
// import { vexo } from 'vexo-analytics';

import App from './App';
// vexo('7d29d2dd-2e68-4ea7-81f2-20339069289a');
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);
