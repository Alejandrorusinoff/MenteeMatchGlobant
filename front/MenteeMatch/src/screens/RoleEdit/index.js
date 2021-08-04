import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList, View, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '../../redux/Reducers/Skills';
import { updateUser } from '../../redux/Reducers/UserReducer';
import LinearGradient from 'react-native-linear-gradient';
import BouncyCheckbox from "react-native-bouncy-checkbox" ;
import { globantBright } from '../../assets/styles/colors';
import useMode from '../../hooks/useMode';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { storeData } from '../../utils/storage';

export default function RoleEdit({ navigation }) {
    const { mode } = useMode()
    const user = useSelector(state => state.user);
    const { theme } = useSelector(state => state);
    //const [ menteeBox, setMenteeBox] = React.useState(user.isMentee);
    //const [ mentorBox, setMentorBox] = React.useState(user.isMentor);
    const [ role, setRole ] = React.useState('');
  
    const dispatch = useDispatch();
    const skills = useSelector(state => state.skills);
    
    React.useEffect(() => {
       if (!skills.length) dispatch(getSkills())
    }, [dispatch, user.isMentor, user.isMentee])

    const menteeCheck = () => {
        setRole('mentee');
    }
    
    const mentorCheck = () => {
        setRole('mentor');
    }
    
    const handleSubmit = () => {
        if ( role === "mentee" && !user.isMentee ) {
            return dispatch(
                updateUser({
                    url: '/api/users/profile',
                    data: { isMentee: true, actualRole: 'Mentee' },
                }))
                .then((data) => {
                    storeData('user', data.payload)
                    ToastAndroid.showWithGravityAndOffset("Ahora tambien sos Mentee!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
                })

        }
        else if ( role === "mentor" && !user.isMentor) {
            return dispatch(
                updateUser({
                    url: '/api/users/profile',
                    data: { isMentor: true, actualRole: 'Mentor' },
                }))
                .then((data) => {
                    storeData('user', data.payload)
                    ToastAndroid.showWithGravityAndOffset("Ahora tambien sos Mentor!", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
                })
        } 
    }

    return (
        <SafeAreaView style={{ flex:1,  alignItems: "center", backgroundColor: mode.bg}}>
            <View style={styles.header}>
                <BouncyCheckbox 
                    disableBuiltInState={user.isMentee}
                    isChecked={user.isMentee}
                    text="Mentee"
                    fillColor= "#BFD732"
                    iconStyle={{ borderColor: "#BFD732" }}
                    onPress={() => user.isMentee ? ToastAndroid.showWithGravityAndOffset("No puedes desmarcar esta opcion", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50): menteeCheck()}
                />
            </View>
            { user.isMentee ? (
            <>
                <TouchableOpacity style={styles.editButton}
                    onPress={() => user.mentor ?
                        ToastAndroid.showWithGravityAndOffset("No puedes cambiar tus habilidades si tienes mentor", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
                        :
                        navigation.navigate("Skills", { name: "Mentee", learnOrTeach: "learn", property:"skillsToLearn"})}
                >
                    <FontAwesome name="edit" color={"#BFD732"} size={30} />
                <Text style={{...styles.editText, color: mode.text}} >Habilidades que quieres aprender</Text>
                </TouchableOpacity>
                  <View
                    style={{
                        ...styles.btnsContainer,
                        borderColor: mode.text,
                        backgroundColor: mode.bg,
                    }}>

                        <FlatList
                            scrollEnabled={true}
                            contentContainerStyle={{
                                alignSelf: 'center',
                                alignItems: 'center',
                            }}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={user.skillsToLearn}
                            keyExtractor={skills => skills._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity disabled={true} style={{...styles.skillButton}}
                                >
                                    <LinearGradient
                                        colors={theme === 'ligth' ? ['#25F198', '#15C9C3'] : [ "#CCC", mode.bg ]}
                                        useAngle={true} angle={40} angleCenter={{x:0.5,y:0.5}}
                                        style={styles.gradient}
                                    >
                                        <Text style={styles.text} >{item.name}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
            </>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text>Todavia no sos Mentee</Text>
                </View>
            )}
        <View style={styles.header} >
                <BouncyCheckbox 
                    disableBuiltInState={user.isMentor}
                    isChecked={user.isMentor}
                    text="Mentor"
                    fillColor= "#BFD732"
                    iconStyle={{ borderColor: "#BFD732" }}
                    onPress={() => mentorCheck()}
                    onPress={() => user.isMentor ? ToastAndroid.showWithGravityAndOffset("No puedes desmarcar esta opcion", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50): mentorCheck()}
                />
        </View>
            { user.isMentor ? (
                <>
                <TouchableOpacity style={styles.editButton}
                    onPress={() => user.mentees.length ?
                        ToastAndroid.showWithGravityAndOffset("No puedes cambiar tus habilidades si tienes mentees", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
                        :
                        navigation.navigate("Skills", { name: "Mentor", learnOrTeach: "teach", property:"skillsToTeach"})}
                >
                    <FontAwesome name="edit" color={"#BFD732"} size={30} />
                <Text style={{...styles.editText, color: mode.text}} >Habilidades que quieres enseñar</Text>
                </TouchableOpacity>
                  <View
                    style={{
                        ...styles.btnsContainer,
                        borderColor: mode.text,
                        backgroundColor: mode.bg,
                    }}>

                        <FlatList
                            scrollEnabled={true}
                            contentContainerStyle={{
                                alignSelf: 'center',
                                alignItems: 'center',
                            }}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={user.skillsToTeach}
                            keyExtractor={skills => skills._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity disabled={true} style={styles.skillButton}
                                >
                                    <LinearGradient
                                        colors={theme === 'ligth' ? ['#25F198', '#15C9C3'] : [ "#CCC", mode.bg ]}
                                        useAngle={true} angle={40} angleCenter={{x:0.5,y:0.5}}
                                        style={styles.gradient}
                                    >
                                        <Text style={styles.text} >{item.name}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </>

            ) : (
                <View style={{ flex:1 }}>
                    <Text>Todavia no sos Mentor</Text>
                </View>
            )}
        { user.isMentor && user.isMentee ? 
            null : (
            <TouchableOpacity style={styles.button}
                onPress={() => handleSubmit()}
            >
                <LinearGradient
                    colors={['#D9E021', '#8CC63f']}
                    useAngle={true} angle={40} angleCenter={{x:0.5,y:0.5}}
                    style={styles.gradient}
                >
                    <Text style={styles.text} >Confirmar</Text>
                </LinearGradient>
            </TouchableOpacity>
            )
         }

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    gradient: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    button: {
        width: "30%",
        height: 50,
        margin: 5 ,
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    btnsContainer: {
        flex:1,
        flexDirection: 'row',
        position: 'relative',
        borderColor: globantBright.blackPearl,
        backgroundColor: globantBright.lightgray,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        margin: 5,
    },
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globantBright.bg,
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: globantBright.charade,
        margin: 5,
        elevation: 5,
        width: 120,
        height: 75,
    },
    pressableTxt: {
        color: globantBright.text,
    },
    editButton: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        height: "5%",
        //width: "15%",
        //backgroundColor: "#BFD732",
        //borderRadius: 10
    },
    editText: {
        fontSize: 16,
        color: "#000000"
    },
    skillButton: {
        width: 120,
        height: 60,
        margin: 3 ,
        paddingHorizontal: 5,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 32,
        fontSize: 24,
        position: 'relative',
        zIndex: 10,
    },
})

