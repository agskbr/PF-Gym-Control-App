//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const {
  loaderUsers,
  loaderActivity,
  loaderTrainer,
  loaderReview,
  loaderDiaHora,
  loaderOrder,
  loaderOrderline,
  loaderCodigo
} = require('./src/loader/loader')


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {

    await loaderUsers();
    await loaderActivity();
    await loaderTrainer();
    await loaderReview();
    await loaderDiaHora();
    await loaderOrder();
    await loaderOrderline();
    await loaderCodigo();

    console.log('%s listening 3001 '); // eslint-disable-line no-console
  });
});



