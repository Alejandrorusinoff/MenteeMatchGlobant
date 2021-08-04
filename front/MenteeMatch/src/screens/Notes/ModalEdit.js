import React, { useState } from 'react';
import { Text } from 'react-native';
import Dialog from 'react-native-dialog';
import useMode from '../../hooks/useMode';

const ModalEdit = ({ show, inputs, toggle, handleEdit, noteId }) => {
  const [title, settitle] = useState(inputs.title);
  const [note, setnote] = useState(inputs.note);
  const { mode } = useMode()

  return (
    <Dialog.Container contentStyle={{backgroundColor: mode.bg}} visible={show}>
      <Dialog.Title style={{color: mode.text}}>Edita tu nota!</Dialog.Title>
      <Text style={{color: mode.text, paddingLeft: 10}}>Titulo</Text>
      <Dialog.Input
        color={mode.text}
        /* label="Titulo" */
        value={title}
        onChangeText={settitle}></Dialog.Input>

      <Text style={{color: mode.text, paddingLeft: 10}}>Nota</Text>
      <Dialog.Input
        color={mode.text}
        /* label="Nota" */
        value={note}
        onChangeText={setnote}></Dialog.Input>
      <Dialog.Button label="Cerrar" onPress={() => toggle()} />
      <Dialog.Button
        label="Editar"
        onPress={() => handleEdit(noteId, title, note) && toggle()}
      />
    </Dialog.Container>
  );
};

export default ModalEdit;
