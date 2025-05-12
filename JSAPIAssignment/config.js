const config = {
    DB: {
      user: 'wearable',
      password: 'device',
      server: 'buscissql1901.busdom.colostate.edu\\cisweb', 
      database: 'Team104DB',
      trustServerCertificate: true,
      options: {
        encrypt: false 
      }
    },
    JWT: "mysupersecret" 
  };
   
  module.exports = config;