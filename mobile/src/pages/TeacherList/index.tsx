import React, { useState } from 'react';
import { Text, View, ScrollView, Picker } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from  '@react-native-community/async-storage';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

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
  const [ time, setTime ] = useState(new Date());
  const [ timeFormatted, setTimeFormatted ] = useState('Qual hora?');
  const [ showTimePicker, setShowTimePicker ] = useState(false);

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

  function handleTimeSelected(event: Event, selectedDate: Date | undefined) {
    setShowTimePicker(false);

    const timePickedByUser = selectedDate;

    if (timePickedByUser) {
      setTime(timePickedByUser);

      const hoursAndMinutes = `${timePickedByUser.getHours()}:${timePickedByUser.getMinutes()}`;
      
      setTimeFormatted(hoursAndMinutes);
    }

  };

  async function handleFiltersSubmit() {
    loadFavorites();
    
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time: timeFormatted,
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

            <View style={styles.input}>
              <Picker
                style={{ height: 54, width: '100%' }}
                selectedValue={subject}
                onValueChange={itemValue => setSubject(itemValue)}
              >
                <Picker.Item label='Qual matéria?' value={null} />
                <Picker.Item label="Biologia" value="Biologia" />
                <Picker.Item label="Filosofia" value="Filosofia" />
                <Picker.Item label="Física" value="Física" />
                <Picker.Item label="Geografia" value="Geografia" />
                <Picker.Item label="História" value="História" />
                <Picker.Item label="Inglês" value="Inglês" />
                <Picker.Item label="Matemática" value="Matemática" />
                <Picker.Item label="Português" value="Português" />
                <Picker.Item label="Química" value="Química" />
                <Picker.Item label="Sociologia" value="Sociologia" />
              </Picker>
            </View>
            
            <View style={[styles.inputGroup]}>
              <View style={[styles.input, styles.inputBlock1]}>
                <Picker
                  style={{ height: 54, width: '100%' }}
                  selectedValue={week_day}
                  onValueChange={itemValue => setWeekDay(itemValue)}
                >
                  <Picker.Item label='Dia da semana?' value={null} />
                  <Picker.Item label="Domingo" value="0" />
                  <Picker.Item label="Segunda-feira" value="1" />
                  <Picker.Item label="Terça-feira" value="2" />
                  <Picker.Item label="Quarta-feira" value="3" />
                  <Picker.Item label="Quinta-feira" value="4" />
                  <Picker.Item label="Sexta-feira" value="5" />
                  <Picker.Item label="Sábado" value="6" />
                  </Picker>
              </View>


              <View style={[styles.input, styles.inputBlock2]}>
                <RectButton 
                  onPress={ () => setShowTimePicker(true) }
                >
                  <Text style={{fontSize:16,}}>{timeFormatted}</Text>
                </RectButton>
                { showTimePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={ (e, date) => handleTimeSelected(e, date) }
                  />
                )}
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