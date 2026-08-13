/**
 * Generates standard Create/Read/Update/Delete handlers for a Mongoose model.
 * Keeps the per-resource controllers (club, event, announcement) tiny and consistent.
 *
 * @param {import('mongoose').Model} Model
 * @param {{ populate?: string, sort?: object }} [options]
 */
function crudFactory(Model, options = {}) {
  const { populate, sort = { createdAt: -1 } } = options;

  return {
    getAll: async (req, res, next) => {
      try {
        let query = Model.find().sort(sort);
        if (populate) query = query.populate(populate);
        const docs = await query;
        res.json(docs);
      } catch (err) {
        next(err);
      }
    },

    getOne: async (req, res, next) => {
      try {
        let query = Model.findById(req.params.id);
        if (populate) query = query.populate(populate);
        const doc = await query;
        if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });
        res.json(doc);
      } catch (err) {
        next(err);
      }
    },

    create: async (req, res, next) => {
      try {
        const doc = await Model.create(req.body);
        res.status(201).json(doc);
      } catch (err) {
        next(err);
      }
    },

    update: async (req, res, next) => {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });
        res.json(doc);
      } catch (err) {
        next(err);
      }
    },

    remove: async (req, res, next) => {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ error: `${Model.modelName} not found` });
        res.json({ message: `${Model.modelName} deleted`, id: req.params.id });
      } catch (err) {
        next(err);
      }
    },
  };
}

module.exports = crudFactory;
