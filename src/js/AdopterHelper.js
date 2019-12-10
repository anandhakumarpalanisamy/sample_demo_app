import RNFetchBlob from 'react-native-fetch-blob';
const RNFS = require('react-native-fs');

class AdopterHelper {

    static fabricPath = RNFS.DocumentDirectoryPath + '/fabric';
    static networkYamlPath = this.fabricPath + '/network.yaml';

    static certificate_paths = {
        kvsPath : this.fabricPath + '/kvs',
        mspPath : this.fabricPath + '/msp',
        commonCertsTlsPath : this.fabricPath + '/common_certs/tls',
        rootcaCertPath : this.fabricPath + '/common_certs/tls/ca_root_cert.pem',
        ordererCertPath : this.fabricPath + '/common_certs/tls/orderer0-mysome-ca.pem',
        peerCertPath : this.fabricPath + '/common_certs/tls/peer0-bityoga-ca.pem',
    }


    static fetch_file_from_url_and_save_locally = async(url,file_name_with_path) => {
        console.log(url);
        await RNFetchBlob.config({
                        // add this option that makes response data to be stored as a file,
                        // this is much more performant.
                        fileCache : true,
                        path : file_name_with_path
                    })
                    .fetch('GET', url, {
                        //some headers ..
                    })
                    .then((res) => {
                        
                        // the temp file path
                        console.log('The file saved to ', res.path())
                    })
    }

    static download_fabric_config_cert_files = async (fabric_ip) => {
       

        let peer_ca_cert_url = "http://"+fabric_ip+":8989/%21/file/common_certs/peer0-bityoga-ca.pem";
        let orderer_ca_cert_url = "http://"+fabric_ip+":8989/%21/file/common_certs/orderer0-mysome-ca.pem";
        let root_ca_cert_url = "http://"+fabric_ip+":8989/%21/file/common_certs/rca-mysome-ca-chain.pem";
        

        await this.fetch_file_from_url_and_save_locally(peer_ca_cert_url,this.certificate_paths.peerCertPath);
        await this.fetch_file_from_url_and_save_locally(orderer_ca_cert_url,this.certificate_paths.ordererCertPath);
        await this.fetch_file_from_url_and_save_locally(root_ca_cert_url,this.certificate_paths.rootcaCertPath);

    }

    static prepare_config_files = async (fabric_ip,com_dot_app_name) => {

        await this.download_fabric_config_cert_files(fabric_ip);
       
        let network = await RNFS.readFileAssets('fabric/network.yaml', 'utf8');
            
        var ip_regex = /FABRIC_IP/gi;
        var ksv_path_regex = /LOCAL_KVS_PATH/gi;
        var msp_path_regex = /LOCAL_MSP_PATH/gi;
        var common_tls_path_regex = /COMMON_CERTS_TLS_PATH/gi;
        var root_ca_cert_path_regex = /ROOT_CA_CERT_PATH/gi;
        var orderer_cert_path_regex = /ORDERER_CERT_PATH/gi;
        var peer_cert_path_regex = /PEER_CERT_PATH/gi;


        
        network = network.replace(ip_regex, fabric_ip);
        network = network.replace(ksv_path_regex, this.certificate_paths.kvsPath);
        network = network.replace(msp_path_regex, this.certificate_paths.mspPath);
        network = network.replace(common_tls_path_regex, this.certificate_paths.commonCertsTlsPath);
        network = network.replace(root_ca_cert_path_regex, this.certificate_paths.rootcaCertPath);
        network = network.replace(orderer_cert_path_regex, this.certificate_paths.ordererCertPath);
        network = network.replace(peer_cert_path_regex, this.certificate_paths.peerCertPath);

        console.log(network);
        await RNFS.writeFile(this.networkYamlPath, network);
            
    }
}
   


export default AdopterHelper;