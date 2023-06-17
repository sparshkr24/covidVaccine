import prisma from '../../../prisma/prisma';
import auth from '../../../middleware/auth'

export default auth(async function handler(req, res) {
    try {
      const vaccinationCenters = await prisma.VaccinationCenter.findMany();
  
      res.status(200).json(vaccinationCenters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });