/**
 * 关于数据库的所有操作
 * 增
 * 删
 * 改
 * 查
 */

const mongodb = require('mongodb');
// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

function connect(collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017', (err, database) => {
            if (err) {
                reject(err);
                return;
            }
            let db = database.db('1812'); // 使用1812数据库
            let col = db.collection(collectionName); // 使用集合
            resolve({
                col,
                database
            });
        });
    });
}
//查
exports.find = (collectionName, query) => { //集合名，查询条件
    return new Promise(async (resolve, reject) => {
        let {
            col,
            database
        } = await connect(collectionName);

        col.find(query).toArray((err, result) => {
            
            resolve({
                data: result
            });
        });
        database.close(); // 关闭数据库，避免资源浪费
    });
}
//分页查询
exports.findfenye = (collectionName, query, num) => { //集合名，查询条件
    return new Promise(async (resolve, reject) => {
        let {
            col,
            database
        } = await connect(collectionName);
        col.find(query).skip(num).limit(10).toArray((err, result) => { // 查询10
            if (err) {
                reject({
                    code: 0,
                    msg: 'fail',
                    data: {}
                });
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    data: result
                });
            }
        });
        database.close(); // 关闭数据库，避免资源浪费
    });
}
//排序
exports.Rank = (collectionName, query, rank) => { //集合名，查询条件，排序条件
    return new Promise(async (resolve, reject) => {
        let {
            col,
            database
        } = await connect(collectionName);
        col.find(query).sort(rank).toArray((err, result) => { // 查询全部
            if (err) {
                reject({
                    code: 0,
                    msg: 'fail',
                    data: {}
                });
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    data: result
                });
            }
        });
        database.close(); // 关闭数据库，避免资源浪费
    });
}
//增
exports.insert = (collectionName, data) => { //集合名，数据
    return new Promise(async (resolve, reject) => {
        let {
            col,
            database
        } = await connect(collectionName);
        col[Array.isArray(data) ? 'insertMany' : 'insertOne'](data, (err, result) => { //插入
            if (err) {
                reject({
                    code: 0,
                    msg: 'fail',
                    data: {}
                });
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    data: result
                });
            }
        });
        database.close(); // 关闭数据库，避免资源浪费
    });
}
//删
exports.delete = (collectionName, query) => { //集合名，查询条件
    return new Promise(async (resolve, reject) => {
        let {
            col,
            database
        } = await connect(collectionName);
        col['deleteMany'](query, (err, result) => {
            if (err) {
                reject({
                    code: 0,
                    msg: 'fail',
                    data: {}
                });
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    data: result
                });
            }
        });
        database.close(); // 关闭数据库，避免资源浪费
    });
}
//改
exports.update = (collectionName, query, data) => { //集合名，查询条件,数据
    return new Promise(async (resolve, reject) => {
        let {
            col,
            database
        } = await connect(collectionName);
        col['updateMany'](query, {
            $set: data
        }, (err, result) => { //插入
            if (err) {
                reject({
                    code: 0,
                    msg: 'fail',
                    data: {}
                });
            } else {
                resolve({
                    code: 1,
                    msg: 'success',
                    data: result
                });
            }
        });
        database.close(); // 关闭数据库，避免资源浪费
    });
}



//----------------------
// const {
//   MongoClient,
//   ObjectId
// } = require('mongodb');
// // Connection URL
// const url = 'mongodb://localhost:27017';
// // Database Name
// const dbName = '1812';
// // Use connect method to connect to the server
// //链接数据库
// let connect = () => {
//   return new Promise((resolve, reject) => {
//     MongoClient.connect(url, (err, client) => {
//       if (err) {
//         reject(err)
//       } else {
//         //   console.log("Connected successfully to server");
//         const db = client.db(dbName);
//         resolve({
//           db,
//           client
//         })
//       }
//     });
//   })
// }
// //增
// let insert = (col, arr) => {
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.insertMany(arr, (err, result) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(result);
//         client.close();
//       }
//     })
//   })
// }
// //删
// let del = (col, arr) => { //集合名，查询条件
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.deleteMany(arr, (err, result) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(result);
//         client.close();
//       }
//     })
//     // col['deleteMany'](query, (err, result) => {
//     //   if (err) {
//     //     reject({
//     //       code: 0,
//     //       msg: 'fail',
//     //       data: {}
//     //     });
//     //   } else {
//     //     resolve({
//     //       code: 1,
//     //       msg: 'success',
//     //       data: result
//     //     });
//     //   }
//     // });
//     // database.close(); // 关闭数据库，避免资源浪费
//   });
// }
// //查
// let find = (col, obj) => {
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.find({
//       ...obj
//     }).toArray(function (err, docs) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(docs);
//         client.close();
//       }
//     });
//   })
// }
// //分类
// let sort = (col, obj, obj2) => {
//   return new Promise(async (resolve, reject) => {
//     let {
//       db,
//       client
//     } = await connect();
//     const collection = db.collection(col);
//     collection.find({
//       ...obj
//     }).sort({
//       ...obj2
//     }).toArray(function (err, docs) {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(docs);
//         client.close();
//       }
//     });
//   })
// }

// module.exports = {
//   connect,
//   insert,
//   find,
//   ObjectId,
//   del,
//   sort
// }

// // node express mongodb jquery