import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {dateFormat} from '../helpers';

interface Paciente {
  id: number;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;
}

interface PacienteProps {
  item: Paciente;
  setModalVisible: (visible: boolean) => void;
  /* editPaciente: (paciente: Paciente) => void; */
  editPaciente: (id: number) => void;
  deletePaciente: (id: number) => void;
  setModalPaciente: (visible: boolean) => void;
  setPaciente: (paciente: Paciente) => void;
}

const Paciente: React.FC<PacienteProps> = ({
  item,
  setModalVisible,
  setPaciente,
  editPaciente,
  deletePaciente,
  setModalPaciente,
}) => {
  const {paciente, fecha, id} = item;

  /* const dateFormat = (date: Date): string => {
    const nuevaFecha = new Date(date);
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-ES', opciones);
  }; */
  return (
    <Pressable
      onLongPress={() => {
        setModalPaciente(true);
        setPaciente(item);
      }}>
      <View style={styles.contenedor}>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{paciente}</Text>
        <Text style={styles.fecha}>{dateFormat(fecha)}</Text>

        <View style={styles.contenedorBtns}>
          <Pressable
            style={[styles.btn, styles.btnEditar]}
            onLongPress={() => {
              setModalVisible(true);
              editPaciente(id);
            }}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => deletePaciente(id)}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding: 20,
    marginHorizontal: 2,
    /*     borderBottomColor: '#94a3B8',
    borderBottomWidth: 1, */
    marginVertical: 10, // Espacio entre cards
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Color de la sombra
    shadowOffset: {width: 0, height: 1}, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 1, // Radio de la sombra
    elevation: 2, // Elevación para Android
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  texto: {
    color: '#6D28D9',
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10,
  },
  fecha: {
    color: '#374151',
  },
  contenedorBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#F59E0B',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});

export default Paciente;
