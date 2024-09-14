import sequelize from "../../database/database";
import HotelRepository from "./hotelRepository";
import HotelController from "./controllerHotel";

const hotelRepository = new HotelRepository(sequelize);
const hotelController = new HotelController(hotelRepository);

export default hotelController;
