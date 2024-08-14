import React, {useState} from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import DetailPaciente from './src/components/DetailPaciente';

interface PacienteData {
  id: number;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;
}

const App: React.FC = () => {
  //hooks parte superior
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<PacienteData[]>([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const editPaciente = (id: number) => {
    const pacienteEditar = pacientes.filter(p => p.id === id);
    /* console.log('editando...', pacienteEditar); */
    setPaciente(pacienteEditar[0]);
  };

  const deletePaciente = (id: number) => {
    Alert.alert(
      '¿Deseas eliminar esta cita?',
      'Una cita eliminada no se puede recuperar',
      [
        {text: 'Cancelar'},
        {
          text: 'Sí, Eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              pacientesState => pacientesState.id !== id,
            );

            setPacientes(pacientesActualizados);
          },
        },
      ],
    );
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            console.log(item);
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                editPaciente={editPaciente}
                deletePaciente={deletePaciente}
                setModalPaciente={setModalPaciente}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="fade">
        <DetailPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
    marginTop: 30,
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 50,
  },
});

export default App;
