import React from 'react';
import { Link as RNLink } from 'expo-router'
import { View, Text, surfaced } from '@/uikit';
import * as showcaselinks from '../components/_index'

const Link = surfaced(View).as(RNLink);

export default function Screen() {
  return (
    <View padding="size10" itemsCenter justifyCenter flexDirection='column' gap="size10"> 
      <Text fontFamily="Inter.ExtraBold" fontSize="size10" color="surfaces.0" textAlign='center'>
        Showcase
      </Text>

      <View width={300} backgroundColor="surfaces.800" borderRadius="size4" itemsCenter justifyCenter>
        {Object.entries(showcaselinks).map(([key, value]) => (
          <ShowcaseLink key={key} name={key} />
        ))}
      </View>
    </View>
  )
}

const ShowcaseLink: React.FC<{ name: string }> = (props) => {
  return (
    <Link
      href={`/${props.name}`}
      width="100%"
      padding="size4"
      backgroundColor="surfaces.800"
      borderRadius="size4"
      display="flex"
      itemsCenter
      justifyCenter
    >
      <Text 
        fontFamily="Inter.Bold"
        fontSize="size6"
        color="surfaces.0"
        textAlign='center'
      >
        {props.name}
      </Text>
    </Link>
  )
}
