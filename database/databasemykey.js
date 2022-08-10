try {
    const mysql = require('mysql');
      
    function handleDisconnect() {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'paypal'
        });
        
        connection.connect(function(err) {
            if(err) {
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            } else {
                console.log('Conectado a BD');
            }
        });

        connection.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });
        
        module.exports = connection;
    }
    
    handleDisconnect();

} catch (error) {
    
}