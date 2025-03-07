const Express = require('express')
const BusModel = require('../models/Bus')
const isAuth = require('../middleware/isAuth')

const BusRouter = Express.Router()



BusRouter.post('/Create-bus', async (req, res)=>{
    try{
        const {busNo,startPoint,endPoint} = req.body

        if(!busNo || !startPoint || !endPoint ){
            return res.send({success: false, message: 'Please provide all details!'})
        }
        
        const fetchBus = await BusModel.findOne({busNo : busNo})
        if(fetchBus){
            return res.send({success: false, message: 'Bus already exist! Please try login.'})
        }



        const newBus = new BusModel({
         
            busNo: busNo,
            startPoint: startPoint,
            endPoint: endPoint
           
        })

        const saveBus = await newBus.save()

        if(saveBus){

            return res.send({success : true , message : "Bus created successfully" , Bus : saveBus })

        }
        else{

            return res.send({success : false , mes
                : "Failed to create please try again later"
            })

        }
    }
    catch(err){
        console.log("Error in Register:",err)
        return res.send({success: false, message: 'Trouble in Registration! Please contact admin.'})
    }
})





module.exports = BusRouter
