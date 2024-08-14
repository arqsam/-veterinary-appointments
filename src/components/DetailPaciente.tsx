import React from 'react';
import {Text, SafeAreaView, View, Pressable, StyleSheet} from 'react-native';
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

interface DetailPacienteProps {
  paciente: Paciente;
  setModalPaciente: (visible: boolean) => void;
  setPaciente: React.Dispatch<React.SetStateAction<Paciente | {}>>;
}
const DetailPaciente: React.FC<DetailPacienteProps> = ({
  paciente,
  setPaciente,
  setModalPaciente,
}) => {
  console.log(paciente);
  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>
        Información {''}
        <Text style={styles.tituloBold}>Paciente</Text>
      </Text>

      <View>
        <Pressable
          style={styles.btnClose}
          onLongPress={() => {
            setModalPaciente(false);
            setPaciente({});
          }}>
          <Text style={styles.btnCloseText}>Cerrar</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre: </Text>
          <Text style={styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Propietario: </Text>
          <Text style={styles.valor}>{paciente.propietario}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.valor}>{paciente.email}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Teléfono: </Text>
          <Text style={styles.valor}>{paciente.telefono}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Fecha de la Cita: </Text>
          <Text style={styles.valor}>{dateFormat(paciente.fecha)}</Text>
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Síntomas del Paciente: </Text>
          <Text style={styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F59E0B',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnClose: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  btnCloseText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  campo: {
    marginVertical: 8,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '400',
    fontSize: 12,
    marginBottom: 3,
  },
  valor: {
    fontWeight: '600',
    fontSize: 20,
    color: '#334155',
  },
});

export default DetailPaciente;
