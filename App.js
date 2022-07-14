import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([
    { text: 'create an app', key: '1' },
  ]);

  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })
      Keyboard.dismiss();
    } else {
      Alert.alert('Oops', 'Too Short!', [
        { text: 'OK', onPress: () => console.log('alert closed') }
      ]);
    }

  }

  return (
    <TouchableWithoutFeedback onPress={ () => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f1fc',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 10,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
});
