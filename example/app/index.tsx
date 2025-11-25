import React, { useEffect } from 'react';
import { View, Text } from '@/uikit';

export default function ModalScreen() {
  const [ height, setHeight ] = React.useState(200)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeight((prev) => prev === 200 ? 400 : 200);
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <View width="100%" height="100%" backgroundColor="red" justifyContent="center" alignItems="center">

      <View
        display="flex"
        flexDirection="column"
        backgroundColor='black'
        gap={10}
        p={10}
        height={200}
        transition={{ 
          height: true
        }}

        overrides={() => [
          { height: height }
        ]}
      >
        {/* <View backgroundColor="blue" width={200} height={200} margin={10}/>
        <View backgroundColor="blue" width={200} height={200} margin={10}/>
        <View backgroundColor="blue" width={200} height={200} margin={10}/> */}
      </View>
    </View>
  );
}
