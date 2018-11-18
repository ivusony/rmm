{
    module.exports = {
        modem: 'thomson',
        aquilaOn:{
            pre: {
                part1: 'snmpset -v2c -c',
                part2: 'snmpset -v2c -c'
            },
            OID:  {
                part1: '1.3.6.1.4.1.2863.205.10.1.6.0 i 1',
                part2: '1.3.6.1.4.1.2863.205.1.1.78.2.0 i 2'
            }
        },
        aquilaOff:{
            pre: {
                part1: 'snmpset -v2c -c',
                part1: 'snmpset -v2c -c'
            },
            OID: {
                part1: '1.3.6.1.4.1.2863.205.10.1.6.0 i 2',
                part2: '1.3.6.1.4.1.2863.205.1.1.78.2.0 i 0'
            }
        }
    }
}