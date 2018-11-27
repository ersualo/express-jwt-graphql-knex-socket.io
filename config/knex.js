export default require ('knex') ({
	client : 'mysql',
	connection : {
		host : 'localhost',
		user : 'root',
		password: '',
		database : 'graph',
		charset : 'utf8'
	}
});