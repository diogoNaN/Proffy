import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';


function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={giveClassesBgImage} 
        resizeMode='contain' 
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar você precisa se cadastrar como professor na nossa plataforma Web.
        </Text>
      </ImageBackground>

      <RectButton 
        style={styles.okButton} 
        onPress={handleNavigateBack}
      >
        <Text style={styles.okButtonText}>Entendi</Text>
      </RectButton>

    </View>
  )
}

export default GiveClasses;