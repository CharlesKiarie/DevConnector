import mongodb, {Db, ConnectOptions} from "mongodb";
const mongoClient = mongodb.MongoClient;

let _db: Db;

const mongoConnect = (callback: Function) => {
	mongoClient.connect(process.env.DATABASE_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	} as ConnectOptions)
	.then(client => {
		console.log('Database Connected');
		_db = client.db();
		callback(client);
	})
	.catch(error => {
		console.log(error);
		throw error;
	});
};

const getDb = () => {
	if(_db) {
		return _db;
	}
	throw "No Database Found"
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;