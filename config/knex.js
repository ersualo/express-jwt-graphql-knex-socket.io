export default require ('knex') ({
	client : 'mysql',
	connection : {
		host : 'localhost',
		user : 'root',
		password: 'root*123',
		database : 'cracks',
		charset : 'utf8'
	}
});