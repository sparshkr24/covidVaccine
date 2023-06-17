import prisma from '../../../prisma/prisma';
import auth from '../../../middleware/auth';

export default auth(async function handler(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of items per page
    const offset = (page - 1) * limit;

    const vaccinationCenters = await prisma.VaccinationCenter.findMany({
      take: limit,
      skip: offset,
    });

    res.status(200).json(vaccinationCenters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
