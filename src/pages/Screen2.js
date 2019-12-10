//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text,TouchableOpacity, TouchableHighlight,TextInput } from 'react-native';

import { Icon } from 'react-native-elements';
// import all basic components


import {NativeModules} from 'react-native';


const SdkModule = NativeModules.SdkModule;
 
export default class Screen2 extends Component {

  constructor(props){
    super(props);
    this.state={
        registered_user_name: '',
        check_balance_user_name:'',
        transfer_from_user_name: '',
        transfer_to_user_name: '',
        amount_to_transfer: ''
      }
  }

  query_balance_chaincode = async()=> {
      
    //console.log(Form.state_values());
    var fabric_channel_name = "mysomechannel";
    var registered_user_name = this.state.registered_user_name;
    var chaincode_name = "don9_bank_app_chaincode";
    var chaincode_function_name = "query"

    var json_args = [this.state.check_balance_user_name];

    var stringified_json_args = JSON.stringify(json_args);



    console.log(stringified_json_args);

    
    let chain_code_result = await SdkModule.genericQueryChaincode(fabric_channel_name,
                                                registered_user_name,
                                                chaincode_name, 
                                                chaincode_function_name,
                                                stringified_json_args).catch((error) => {
                                                  console.log(error);
                                                });
    return chain_code_result;
    
    
  }


  update_transfer_chaincode = async()=> {

    var fabric_channel_name = "mysomechannel";
    var registered_user_name = this.state.registered_user_name;
    var chaincode_name = "don9_bank_app_chaincode";
    var chaincode_function_name = "invoke"


    // var json_args = {
    //             a: this.state.transfer_from_user_name,
    //             b: this.state.transfer_to_user_name,
    //             amount: this.state.amount_to_transfer
    //           };

      var json_args = [
        this.state.transfer_from_user_name,
        this.state.transfer_to_user_name,
        this.state.amount_to_transfer
      ];
 

    var stringified_json_args = JSON.stringify(json_args);
    console.log(stringified_json_args);

    let chain_code_result =  await SdkModule.genericExecuteChaincode(fabric_channel_name,
                                                  registered_user_name,
                                                  chaincode_name,
                                                  chaincode_function_name,
                                                  stringified_json_args);
    return chain_code_result;

  }

  check_balance = async()=> {

    console.log(this.state.check_balance_user_name);
    //alert(this.state.check_balance_user_name);
    let query_result = await this.query_balance_chaincode()
    console.log(query_result);
    alert(query_result);
  }

  transfer = async()=> {

    console.log(this.state.transfer_from_user_name);
    console.log(this.state.transfer_to_user_name);
    console.log(this.state.amount_to_transfer);
    //alert(this.state.transfer_from_user_name+','+this.state.transfer_to_user_name+','+this.state.amount_to_transfer);
    let transfer_result = await this.update_transfer_chaincode()
    console.log(transfer_result);
    alert(transfer_result);
  }




  //Screen2 Component
  render() {
    return (
      <View style={styles.container}>
            <Text>{"\n"}</Text>

              <TextInput style={styles.inputBox_registerd_user_name}
                onChangeText={(registered_user_name) => this.setState({registered_user_name})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Registered User Name"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
              />

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  
                  reverse
                  name='logo-usd'
                  type='ionicon'
                  color='#4f83cc'
                  size={18}
                  
                />
                <Text h1 style={{fontWeight: "bold",fontSize:26}}>Check Balance</Text>
              </View>
              
              <TextInput style={styles.inputBox}
                onChangeText={(check_balance_user_name) => this.setState({check_balance_user_name})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="User Name"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
              />

              <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.check_balance}>Balance</Text>
              </TouchableOpacity>
              
              <Text>{"\n"}</Text>
              

              <Text h1 style={{fontWeight: "bold",fontSize:26}}>Transfer Amount</Text>
              <Icon
                
                name='forward'
                type='font-awesome'
                color='#4f83cc'
                
              />
              {/* <Text>{"\n"}</Text> */}

              <View style={{flexDirection:"row"}}>
                  <View style={{flex:1}}>
                        <TextInput style={styles.inputBox_transfer}
                          onChangeText={(transfer_from_user_name) => this.setState({transfer_from_user_name})}
                          underlineColorAndroid='rgba(0,0,0,0)' 
                          placeholder="From"
                          placeholderTextColor = "#002f6c"
                          selectionColor="#fff"
                        />
                  </View>
                  
                  <View style={{flex:1}}>
                        <TextInput style={styles.inputBox_transfer}
                          onChangeText={(transfer_to_user_name) => this.setState({transfer_to_user_name})}
                          underlineColorAndroid='rgba(0,0,0,0)' 
                          placeholder="To"
                          placeholderTextColor = "#002f6c"
                          selectionColor="#fff"
                        />
                  </View>
              </View>

              <TextInput style={styles.inputBox_transfer}
                onChangeText={(amount_to_transfer) => this.setState({amount_to_transfer})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Amount"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
              />
              
              
              <TouchableHighlight style={styles.button} underlayColor={'gray'}> 
                    <Text style={styles.buttonText} onPress={this.transfer}>Transfer</Text>
              </TouchableHighlight>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: '#12799f', 
    fontSize:16
  },
  signupButton: {
      color: '#12799f',
      fontSize:16,
      fontWeight: '500'
  },
  button: {
    width: 100,
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
  inputBox_registerd_user_name: {
    width: 200,
    backgroundColor: '#eeeeee', 
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#002f6c',
    marginVertical: 10
  },
  inputBox_transfer: {
    width: 130,
    backgroundColor: '#eeeeee', 
    borderRadius: 25,
    paddingHorizontal: 35,
    //fontSize: 16,
    color: '#002f6c',
    marginVertical: 10,
    justifyContent: 'center',
    margin:40,
    alignItems:"center"
}

});