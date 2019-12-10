//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from 'react-native';
// import all basic components


//import {prepare_config_files} from '../js/AdopterHelper';

import {NativeModules} from 'react-native';
const SdkModule = NativeModules.SdkModule;
import AdopterHelper from '../js/AdopterHelper';




export default class Screen1 extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password: ''
        }
    }

  

    register = async() => {
        let fabric_ip = "104.248.161.238";
        let register_result = await SdkModule.registerUser(fabric_ip, 
                                                            this.state.email,
                                                            this.state.password);

        console.log(register_result);
        alert(register_result);
    }


    async componentWillMount(){
        let fabric_ip = "104.248.161.238";
        let com_dot_app_name = "com.navigationsample";
        await AdopterHelper.prepare_config_files(fabric_ip,com_dot_app_name);
    }






  //Screen1 Component
  render() {

        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.register}>Register</Text>
                </TouchableOpacity>
            </View>
        );
  }
}
 
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});