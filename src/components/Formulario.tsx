import React, {useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface Paciente {
  id: number;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;
}

interface FormularioProps {
  modalVisible: boolean;
  cerrarModal: () => void;
  /* setModalVisible: (visible: boolean) => void; */
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
  pacientes: Paciente[];
  paciente?: Paciente;
  setPaciente: React.Dispatch<React.SetStateAction<Paciente | {}>>;
}

const Formulario: React.FC<FormularioProps> = ({
  modalVisible,
  cerrarModal,
  setPacientes,
  pacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (pacienteObj && Object.keys(pacienteObj).length > 0) {
      /* console.log('Editando el paciente con ID:', pacienteObj.id); */
      setId(pacienteObj.id.toString());
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    //Validar
    if (
      [paciente, propietario, email, telefono, fecha, sintomas].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos son obligatorios');

      return;
    }

    const nuevoPaciente: Paciente = {
      id: -1, // ID temporal o provisional
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    //Revisar si es un registro nuevo o edición
    if (id) {
      //editar
      nuevoPaciente.id = parseInt(id, 10);

      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );

      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      //crear nuevo
      nuevoPaciente.id = Date.now();
      // Actualiza el estado y muestra el nuevo estado en la consola de Metro
      setPacientes([...pacientes, nuevoPaciente]);
    }

    cerrarModal();

    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.titulo}>
            {pacienteObj && pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancel}
            onLongPress={() => {
              cerrarModal();
              setId('');
              setPacienteApp({});
              setPaciente('');
              setPropietario('');
              setEmail('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');
            }}>
            <Text style={styles.btnCancelText}> Cancelar </Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}> Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}> Email Propietario</Text>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={'#666'}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}> Teléfono Propietario</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor={'#666'}
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.dateContainer}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Síntomas del Paciente"
              placeholderTextColor={'#666'}
              multiline={true}
              numberOfLines={4}
              value={sintomas}
              onChangeText={setSintomas}
            />
          </View>

          <Pressable style={styles.btnNewAppointment} onPress={handleCita}>
            <Text style={styles.btnNewAppointmentText}>
              {' '}
              {pacienteObj && pacienteObj.id ? 'Editar ' : 'Agregar'} Paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#6D28D9',
    paddingBottom: 10,
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
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  dateContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnCancel: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
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
  btnCancelText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btnNewAppointment: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
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
  btnNewAppointmentText: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Formulario;
