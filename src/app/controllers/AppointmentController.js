import * as Yup from 'yup'; // schema validation
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number()
        .integer()
        .positive()
        .required(),
      date: Yup.date().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res
        .status(400)
        .json({ error: `Validation fails - ${err.errors}` });
    });

    // check if provider exists
    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only make appointments with providers' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController(); // todo controller segue esse face
