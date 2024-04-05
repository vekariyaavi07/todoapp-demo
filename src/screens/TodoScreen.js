/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import Fallback from '../../components/Fallback';
import * as Animatable from 'react-native-animatable';
const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleAddTodo = () => {
    if (todo.trim() === '') {
      return;
    }

    setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
    setTodo('');
  };

  const handlerDeleteTodo = id => {
    const updatedList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedList);
  };
  const handleEditTodo = todo => {
    setEdit(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodo = todoList.map(item => {
      if (item.id === edit.id) {
        return {...item, title: todo};
      }
      return item;
    });
    setTodoList(updatedTodo);
    setEdit(null);
    setTodo('');
  };

  const renderTodo = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: '#caf0f8',
          borderRadius: 10,
          margin: 4,
          paddingHorizontal: 6,
          paddingVertical: 0,
          marginLeft: 20,
          marginRight: 20,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: 'white',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.8,
          shadowRadius: 6,
          elevation: 10,
        }}>
        <Text
          style={{fontSize: 25, fontWeight: '500', color: 'black', flex: 1}}>
          {item.title}
        </Text>
        <IconButton
          size={30}
          icon={'pencil'}
          iconColor="#390099"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          size={30}
          icon={'trash-can'}
          iconColor="#390099"
          onPress={() => handlerDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{marginTop: 20}}>
        <Animatable.Text
          style={styles.text}
          animation="fadeInRight"
          duration={1000}>
          TODO APP
        </Animatable.Text>
        <TextInput
          style={styles.textinput}
          placeholder="Add Your Task..."
          value={todo}
          onChangeText={userText => setTodo(userText)}
        />
        {edit ? (
          <AnimatedButton
            style={styles.button}
            animation="zoomIn"
            onPress={() => handleUpdateTodo()}>
            <Text style={styles.text1}>Save</Text>
          </AnimatedButton>
        ) : (
          <AnimatedButton
            style={styles.button}
            animation="zoomIn"
            onPress={() => handleAddTodo()}>
            <Text style={styles.text1}>Add</Text>
          </AnimatedButton>
        )}

        <FlatList
          data={todoList}
          renderItem={renderTodo}
          showsVerticalScrollIndicator={false}
          animation="fadeIN"
          duration={1000}
        />
        {todoList.length <= 0 && <Fallback />}
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  textinput: {
    height: 40,
    borderColor: '#03045e',
    borderWidth: 3.5,

    padding: 10,
    margin: 30,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    margin: 20,
    color: 'black',
  },
  button: {
    height: 40,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    marginLeft: 30,
    marginRight: 30,
  },
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
