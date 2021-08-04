import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Card from './Card';
import { useSelector } from 'react-redux';

import {
  postNote,
  getNotes,
  deleteNote,
  editNote,
} from '../../services/notesAxiosServices';

import { simpleMessage } from '../../utils/index';

const Notes = ({ route }) => {
  const [newData, setNewData] = useState(false);
  const [notes, setnotes] = useState([]);
  const { userToken } = useSelector(state => state.auth);
  const mentee = route.params.mente;

  useEffect(() => {
    const get = async () => {
      const res = await getNotes(userToken, mentee._id);
      setnotes(res.data);
    };
    get();
  }, [newData]);

  const handleAdd = async (userToken, menteeId, data) => {
    const res = await postNote(userToken, menteeId, data);
    if (res) {
      simpleMessage(
        'Nota agregado',
        'La nota fue agregada correctamente',
        'success',
      );
      setNewData(!newData);
    }
  };

  const handleDelete = async noteId => {
    const res = await deleteNote(userToken, noteId);
    if (res) setNewData(!newData);
  };

  const handleEdit = async (noteId, title, description) => {
    const res = await editNote(userToken, noteId, title, description);
    if (res) {
      simpleMessage(
        'La nota editado',
        'La nota fue editado correctamente',
        'success',
      );
      setNewData(!newData);
    }
  };
  return (
    <View style={{flex: 1}}>
      <Card
        mentee={mentee}
        notes={notes}
        userToken={userToken}
        functions={{ handleAdd, handleDelete, handleEdit }}
      />
    </View>
  );
};

export default Notes;
