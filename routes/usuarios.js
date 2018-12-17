'use strict' 
var express = require('express');
var router = express.Router();
var sql = require('mssql');
//HomePage
router.get('/', function(req, res, next){
	res.send("Home Usuarios");
});
router.get('/lista', async function(req, res) {
	// config for your database
	// connect to your database
/* 	sql.connect(
		config,
		function(err) {
			if (err) console.log(err);

			// create Request object
			var request = new sql.Request();

			// query to the database and get the records
			request.query('SELECT COUNT(*) FROM enterprise', function(err, recordset) {
				if (err) console.log(err);

				// send records as a response
				res.send(recordset);
            });
        }
    ); */
	//sql.close();
    // new sql.ConnectionPool(config).connect().then(pool => {
	// 	return pool.request().query("SELECT COUNT(*) as Cantidad_Usuarios FROM enterprise")
    //     }).then(result => {
    //       let rows = result.recordset
    //       res.status(200).json(rows);
    //       sql.close();
    //     }).catch(err => {
    //       res.status(500).send({ message: "Error procesando la consulta"})
    //       sql.close();
	//     });
	let _financiamiento = await financiamiento().catch(err=> err.originalError.info.message).then();
	let _enterprise = await enterprise().catch(err=> err.originalError.info.message).then();
	let _facturas = await facturas().catch(err=> err.originalError.info.message).then();
	let result = {
		financiamiento : _financiamiento, 
		enterprise : _enterprise,
		facturas : _facturas
	}
	res.status(200).json(result);
	  });
	  let financiamiento = async function Financiamiento(){
		return new Promise(async (resolve, reject) => {
			var config = {
				user: 'UserPapayaAPI',
				password: 'P4p4y4.2o18.apI',
				server: 'sqlpapayaprod2014.database.windows.net',
				database: 'DB_PROD_PAPAYA',
				options: {
					encrypt: true
				}
			};
			new sql.ConnectionPool(config).connect().then(pool => {
				return pool.request().query("SELECT COUNT(*) as 'solicitud Financiamiento' FROM finance")
				}).then(result => {
				sql.close();
				  resolve(result.recordset);
				}).catch(err => {
				sql.close();
				  reject(err);
				});
		});
	 }
	 let enterprise = async function Enterprise(){
		return new Promise(async (resolve, reject) => {
			var config = {
				user: 'UserPapayaAPI',
				password: 'P4p4y4.2o18.apI',
				server: 'sqlpapayaprod2014.database.windows.net',
				database: 'DB_PROD_PAPAYA',
				options: {
					encrypt: true
				}
			};
			new sql.ConnectionPool(config).connect().then(pool => {
				return pool.request().query("SELECT COUNT (*) as 'Cantidad Usuarios' FROM enterprise")
				}).then(result => {
					sql.close();
				  	resolve(result.recordset);
				}).catch(err => {
					sql.close();
				  	reject(err);
				});
		});
	 }
	 let facturas = async function Facturas(){
		return new Promise(async (resolve, reject) => {
			var config = {
				user: 'papayaLuser',
				password: '*L\\\\7F+7/A9[5L%IG2OZ!?ZI;', 
				server: 'sqlpapayaprod2014.database.windows.net',
				database: 'DB-PAPAYA-CONSOLIDADO',
				options: {
					encrypt: true
				}
			};
			new sql.ConnectionPool(config).connect().then(pool => {
				return pool.request().query("select Count([Folio]) as 'Total DTE emitidos' from [dbo].[DTE] where [EmitidoRecibido] = 1 ")
				}).then(result => {
				sql.close();
				  resolve(result.recordset);
				}).catch(err => {
				sql.close();
				  reject(err);
				});
		});
	 }
module.exports = router;