var mongoose 		= require('mongoose')
var autoIncrement 	= require('mongoose-auto-increment');

var Schema = mongoose.Schema;
autoIncrement.initialize(mongoose.connection);

// PASTIE MODEL
var PastieSchema = new Schema({
	title: { type: String, default: 'Valor por defecto.' },
	author: { type: String, default: 'Valor por defecto.' },
	privacy: { type: Boolean, default: false },
	content: { type: String, default: 'Valor por defecto.' }
},
{
    timestamps: true
});

PastieSchema.plugin(autoIncrement.plugin, 'Pastie');
module.exports = mongoose.model('Pastie', PastieSchema);