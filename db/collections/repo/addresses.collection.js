const collectionName = path.basename(__filename, '.collection.js')
module.exports = function (dbModel) {
	let schema = mongoose.Schema(
		{
			firm: { type: ObjectId, ref: 'firms', default: null, index: true },
			name: { type: String, default: '' },
			address: {
				room: { type: String, default: '' },
				streetName: { type: String, default: '' },
				blockName: { type: String, default: '' },
				buildingName: { type: String, default: '' },
				buildingNumber: { type: String, default: '' },
				citySubdivisionName: { type: String, default: '' },
				cityName: { type: String, default: '' },
				postalZone: { type: String, default: '' },
				postbox: { type: String, default: '' },
				region: { type: String, default: '' },
				district: { type: String, default: '' },
				country: {
					identificationCode: { type: String, default: '' },
					name: { type: String, default: '' }
				}
			},
			billingInfo: {
				individual: { type: Boolean, default: false, index: true },
				companyName: { type: String, default: '' },
				firstName: { type: String, default: '' },
				lastName: { type: String, default: '' },
				taxOffice: { type: String, default: '' },
				taxNumber: { type: String, default: '', index: true },
				idCardNo: { type: String, default: '', index: true },
			},
			passive: { type: Boolean, default: false, index: true },
		},
		{ versionKey: false, timestamps: true }
	)

	schema.pre('save', (next) => next())
	schema.pre('remove', (next) => next())
	schema.pre('remove', true, (next, done) => next())
	schema.on('init', (model) => { })
	schema.plugin(mongoosePaginate)

	let model = dbModel.conn.model(collectionName, schema, collectionName)

	model.removeOne = (session, filter) => sendToTrash(dbModel, collectionName, session, filter)
	model.relations = {

	}
	return model
}
