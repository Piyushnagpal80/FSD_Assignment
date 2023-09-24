const { response } = require('express');
var User = require('../models/User');

var csv = require('csvtojson');


const importUser = async(req,res)=>{

    try {

        var projectData = [];

        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            // console.log(response);

          for(var i=0;i<response.length;i++){
            projectData.push({
                Title : response[i].Title,
                Technologies : response[i].Technologies,
                Frontend : response[i].Frontend,
                Backend : response[i].Backend,
                Databases : response[i].Databases,
                Infrastructre : response[i].Infrastructre,
            })
          }
          
          await User.insertMany(projectData);

        })

        res.send( {status:200 , success:true , msg:'running'} );
    } catch (error) {
        res.send( {status:400 , success:false , msg:error.message} );
    }

}


const displayData = async (req, res) => {
    try {
      const users = await User.find();
      res.render('displayData', { users }); // Assuming you're using a view engine like EJS or Pug
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  };

  const searchProjects = async (req, res) => {
    try {
      const { frontend, backend } = req.query;
  
      // Define the aggregation pipeline
      const pipeline = [];
  
      // Match documents that match the criteria (case-insensitive)
      if (frontend) {
        pipeline.push({
          $match: {
            Frontend: { $regex: new RegExp(frontend, 'i') },
          },
        });
      }
  
      if (backend) {
        pipeline.push({
          $match: {
            Backend: { $regex: new RegExp(backend, 'i') },
          },
        });
      }
  
      // Execute the aggregation query
      const matchingProjects = await User.aggregate(pipeline);
  
      console.log(matchingProjects); // Add this line for debugging
  
      res.render('searchResults', { projects: matchingProjects });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  };
  
  



module.exports={
    importUser,
    displayData,
    searchProjects
}