import { useState } from 'react';
import { Text, TextInput,   TouchableOpacity, View } from 'react-native';
import styles from './style'; 
import firebase from '../../config/firebase';
import {getFirestore} from 'firebase/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
const db = getFirestore(firebase)

export default function CreateProduct({navigation}){
    const[descricao, setDescricao] = useState("")
    const[valor, setValor] = useState("")
    const[errorCreateProduct, SeterrorCreateProduct] = useState (null)

    const validade = () => {
        if(descricao == "" || valor == ""){
            SeterrorCreateProduct("Informe a descrição e valor")
        }else{
            SeterrorCreateProduct(null)
            CreateProduct()
        }
    }

    const CreateProduct = () => {
        const newProduct = addDoc(collection(db, 'products'),{
            descricao: descricao, 
            valor: valor,
            data_registro: serverTimestamp()
        });

        navigation.navigate('Tabs')

    }

    return(
        <View style={styles.container}>
            {errorCreateProduct != null &&
            <Text style={styles.alert}>{errorCreateProduct}</Text>
            }



            <TextInput style={styles.formInput}
            placeholder='Descrição'
            value={descricao}
            onChangeText={setDescricao}
            />

        <TextInput style={styles.formInput}
            placeholder='Valor'
            value={valor}
            onChangeText={setValor}
            />

            <TouchableOpacity style={styles.formBtn}
            onPress={validade}
            >
                <Text style={styles.TextBtn}>Criar anúncio</Text>
            </TouchableOpacity>

        </View>
    );
}