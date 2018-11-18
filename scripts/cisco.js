{
    module.exports = {
        modem: 'cisco',
        aquilaOn:{
            pre: 'snmpset -v2c -c',
            OID:  '1.3.6.1.4.1.1429.77.1.7.2.1.3.1.40 i 100'
        },
        aquilaOff:{
            pre: 'snmpset -v2c -c',
            OID: '1.3.6.1.4.1.1429.77.1.7.2.1.3.1.40 i 0'
        }
    }
}