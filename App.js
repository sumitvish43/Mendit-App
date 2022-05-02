import React,{useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/homeStack';

const getFonts = ()=>{
  return Font.loadAsync({
    'inter-black': require('./assets/fonts/Inter-Black.ttf'),
    'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
    'inter-regular': require('./assets/fonts/Inter-Regular.ttf'),
    'inter-light': require('./assets/fonts/Inter-Light.ttf')
  });
}


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    return (
      Navigator()
    );
  }
  else{
    return(
      <AppLoading
        startAsync = {getFonts}
        onFinish = {()=>setFontsLoaded(true)}
        onError={() => console.log('error')}
      />
    );
  }
}

