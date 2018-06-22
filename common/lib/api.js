const request = require('request-promise');

const getApps = (apiServer) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await request({
        uri: `${apiServer}/api/apps`,
        json: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getApps,
};
