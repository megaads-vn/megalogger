module.exports = {
    port: 8800,
    debug: true,
    requestTimeout: -1,
    autoload: [
        "/controllers",
        "/entities",
        "/start",
        "/services",
 //       "/network"
//        "/models"
    ],
    assetPath: "/assets",
    encryption: {
        'key': "d6F3Efeq",
        'cipher': "aes-256-ctr"
    }
};