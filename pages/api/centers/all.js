import prisma from "../../../prisma/prisma";
import auth from "../../../middleware/auth";

let t = 0;
const centersAll = async (req, res) => {
  t = 1;
  try {
    t = 2;
    if (req.method == "DELETE") {
      t = 3;
      const { centerId } = req.query;
      t = 4;
      if (!centerId) {
        return res
          .status(400)
          .json({ message: "centerId is required in the request body" });
      }
      console.log("centerId: ", centerId);
      t = 5;
      await prisma.VaccinationCenter.delete({
        where: {
          id: centerId,
        },
      });
      t = 6;
      return res.status(200).json({ message: "Record deleted successfully" });
    }
    t = 7;
    if (Object.keys(req.query).length === 0) {
      t = 8;
      const vaccinationCenters = await prisma.VaccinationCenter.findMany();
      return res.status(200).json(vaccinationCenters);
    }
    t = 9;
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of items per page
    const offset = (page - 1) * limit;
    t = 10;
    const vaccinationCenters = await prisma.VaccinationCenter.findMany({
      take: limit,
      skip: offset,
    });

    return res.status(200).json(vaccinationCenters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error T: ${t}` });
  }
};

export default centersAll;
