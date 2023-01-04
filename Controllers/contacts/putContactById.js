const { Contact } = require('../../models');
const { NotFound } = require('http-errors');

const putContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.json({ status: 'success', code: 200, data: { contact } });
};

module.exports = putContactById;
