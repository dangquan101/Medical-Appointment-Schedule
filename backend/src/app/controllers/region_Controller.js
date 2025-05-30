const Region = require('../models/Region')
const mongoose = require('mongoose')
const Doctor = require('./../models/Doctor')
const Appointment = require('./../models/Appointment')



class region_Controller {

    add_Region = async (req, res) => {
        try {
            // get info from body
            const {name} = req.body

            const exists_reg = await Region.findOne({name})

            if (exists_reg) {
                throw new Error('Region already exits')
            }

            // create
            const region = await Region.create({name})

            res.status(201).json(region)
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    get_Region_List = async (req, res) => {
        try {
            let regions
            const {hidden_state} = req.body

            // find list of region
            if (hidden_state == 'true') {
                regions = await Region.find({is_deleted: true})
            } else {
                regions = await Region.find({is_deleted: false})
            }

            res.status(200).json(regions)
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    update_Region = async (req, res) => {
        try {
            // get info from body
            const {name} = req.body

            // get id
            const region_Id = req.params.id

            // update
            if (!name) {
                throw new Error('Missing information')
            }

            const existing_Region = await Region.findOne({
                name,
                _id: { $ne: region_Id },
            })
            if (existing_Region) {
                throw new Error('Region already exits')
            }

            const region = await Region.findByIdAndUpdate(
                region_Id,
                {name},
                {new: true}
            )

            res.status(200).json(region)
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Region = async (req, res) => {
        try {
            // get id list
            const { region_Ids } = req.body

            // if no ids
            if (
                !region_Ids ||
                !Array.isArray(region_Ids) ||
                region_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Region.updateMany(
            {_id: {$in: region_Ids}},
            {is_deleted: true}
            )

            res.status(200).json({
                message: 'Region soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Region = async (req, res) => {
        try {
            // get id list
            const { region_Ids } = req.body

            // if no ids
            if (
                !region_Ids ||
                !Array.isArray(region_Ids) ||
                region_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Region.updateMany(
                {_id: { $in: region_Ids}},
                {is_deleted: false}
            )

            res.status(200).json({
                message: 'Region restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Region = async (req, res) => {
        try {
            // get id list
            const {region_Ids} = req.body

            // if no ids
            if (
                !region_Ids ||
                !Array.isArray(region_Ids) ||
                region_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Region.deleteMany({_id: {$in: region_Ids}})

            res.status(200).json({
                message: 'Region deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    get_Region = async (req, res) => {
        try {
            const {region_Id} = req.body
            //   console.log("Received region_Id:", region_Id)

            if (!mongoose.Types.ObjectId.isValid(region_Id)) {
                return res.status(400).json({
                    success: false, message: 'Invalid region ID format'
                })
            }

            const region = await Region.findById(region_Id)

            if (!region) {
                return res.status(404).json({
                    success: false, message: 'Region not found'
                })
            }

            res.status(200).json({success: true, data: region })
        } catch (error) {
            console.log('Error:', error.message)
            res.status(500).json({success: false, error: error.message})
        }
    }


    countDoctorsByRegion = async (req, res) => {
        try {
            const result = await Doctor.aggregate([
                // Step 1: Filter doctors by valid region_id
                {
                    $match: {
                        region_id: { $ne: null },
                        is_deleted: { $ne: true },
                        verified: { $ne: false },
                    },
                },
                {
                    $addFields: {
                        region_id: { $toObjectId: "$region_id" }, // Ensure region_id is an ObjectId
                    },
                },
                // Step 2: Group doctors by region_id
                {
                    $group: {
                        _id: "$region_id",
                        doctorCount: { $sum: 1 },
                    },
                },
                // Step 3: Lookup region details
                {
                    $lookup: {
                        from: "regions",
                        localField: "_id",
                        foreignField: "_id",
                        as: "regionDetails",
                    },
                },
                {
                    $match: {
                        "regionDetails.is_deleted": { $ne: true },
                    },
                },
                // Step 4: Lookup doctors in the region 
                {
                    $lookup: {
                        from: "doctors",
                        localField: "_id",
                        foreignField: "region_id",
                        as: "doctors",
                    },
                },
               
                // Step 6: Sort and limit
                {
                    $sort: {
                        doctorCount: -1, // Sort by doctor count
                    },
                },
                {
                    $limit: 5,
                },
                
                {
                    $project: {
                        regionId: "$_id",
                        doctorCount: 1,           
                        regionDetails: { $arrayElemAt: ["$regionDetails", 0] },
                    },
                },
            ]);
    
            if (!result.length) {
                return res.status(404).json({ message: "No data found for any region." });
            }
    
            return res.status(200).json({ data: result });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                error: "An error occurred while counting doctors and appointments by region.",
            });
        }
    };


     countAppointmentsByDoctorWithDetails = async () => {
        try {
            const result = await Appointment.aggregate([
                // Step 1: Group by doctor_id and count appointments
                {
                    $group: {
                        _id: "$doctor_id",
                        appointmentCount: { $sum: 1 },
                    },
                },
                // Step 2: Lookup doctor details
                {
                    $lookup: {
                        from: "doctors", // Ensure this matches the actual collection name
                        localField: "_id",
                        foreignField: "_id",
                        as: "doctorInfo",
                    },
                },
                // Step 3: Extract the first doctorInfo object
                {
                    $project: {
                        doctor_id: "$_id",
                        appointmentCount: 1,
                        doctorInfo: { $arrayElemAt: ["$doctorInfo", 1] }, // Extract the first matching doctorInfo
                    },
                },
            ]);
    
            console.log("Appointments by Doctor with Details:", result);
            return result;
        } catch (error) {
            console.error("Error counting appointments by doctor with details:", error);
        }
    };
    
    
      
}

module.exports = new region_Controller()