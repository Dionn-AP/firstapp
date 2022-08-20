import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    Modal
} from 'react-native';
import Api from '../service/Api';
import { ICharacter } from '../types';

function RMCharacter() {

    const [character, setCharacter] = useState<ICharacter[]>();
    const [showModal, setShowModal] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState<ICharacter[] | undefined>()

    useEffect(() => {
        Api.get('character').then(
            res => {
                setCharacter(res.data.results)
            }
        )
    }, []);

    function characterDetail(id: Number) {

        setShowModal(!showModal)
        const result: ICharacter[] | undefined = character?.filter(item => item.id === id)
        setCurrentCharacter(result)
    }

    return (
        <SafeAreaView
            style={{ backgroundColor: '#7B25F0' }}
        >
            <ScrollView>
                <View
                    style={styles.container}
                >
                    {character?.map(
                        (item, index) => (

                            <View
                                style={styles.card}
                                key={index}
                            >
                                <Modal
                                    animationType='fade'
                                    visible={showModal}
                                    onRequestClose={
                                        () => setShowModal(!showModal)
                                    }
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#7B25F0'
                                        }}
                                    >
                                        <Text style={styles.textName}>
                                            {currentCharacter && currentCharacter[0].name}
                                        </Text>
                                        <Text style={styles.text}>
                                            {currentCharacter && currentCharacter[0].species}
                                        </Text>
                                        <Pressable
                                            onPress={() => setShowModal(!showModal)}
                                        >
                                            <Text style={{color: '#f02525'}}>Fechar</Text>
                                        </Pressable>
                                    </View>
                                </Modal>
                                <Image
                                    style={{ width: 100, height: 100 }}
                                    source={{ uri: item.image }}
                                />
                                <View
                                    style={styles.textBox}
                                >
                                    <Text style={styles.textName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.species}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.gender}
                                    </Text>
                                    <Pressable
                                        onPress={() => characterDetail(item.id)}
                                    >
                                        <Text style={{color: '#42cd07'}}>Ver mais</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    card: {
        backgroundColor: '#7B25F0',
        flexDirection: 'row',
        width: Dimensions.get('window').width - 40,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 12,
        margin: 12
    },
    textBox: {
        flex: 1,
        paddingHorizontal: 15
    },
    textName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    text: {
        color: '#fff'
    }
})

export default RMCharacter;