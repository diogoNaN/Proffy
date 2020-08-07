import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from  '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';


function TeacherList() {
  const [ teachers, setTeachers ] = useState([]);
  const [ favorites, setFavorites ] = useState<number[]>([]);
  const [ isFilterVisible, setIsFilterVisible ] = useState(false);

  const [ subject, setSubject ] = useState('');
  const [ week_day, setWeekDay ] = useState('');
  const [ time, setTime ] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map( (teacher: Teacher) => {
          return teacher.id;
        } )

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function handleToggleFilterVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    })
    setIsFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >

        { isFilterVisible && (
          <View style={styles.searchForm}>
            <TextInput 
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a Matéria?"
              placeholderTextColor='#c1bccc'
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <TextInput 
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Dia da semana?"
                  placeholderTextColor='#c1bccc' 
                />
              </View>

              <View style={styles.inputBlock}>
                <TextInput 
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor='#c1bccc' 
                />
              </View>
            </View>

            <RectButton 
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}

      </PageHeader>

      <ScrollView
        style={styles.techerList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>

    </View>
  )
}

export default TeacherList;