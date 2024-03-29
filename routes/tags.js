var Tag = require('../models/tags').Tag; 

/*
 * Tags Routes
 */
exports.index = function(req, res) {
  Tag.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { tags: docs });  
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the tag the user wants to look up. 
  Tag.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading tag." + err});
    } else {
      res.json(404, { message: "Tag not found."});
    }
  });
}

exports.create = function(req, res) {

  var tag_name = req.body.tag_name; // Name of tag. 
  var tag_description = req.body.tag_description;
  var tag_minor = req.body.tag_minor;
  var tag_major = req.body.tag_major;
  var tag_uuid = req.body.tag_uuid;
  var tag_type = req.body.tag_type;

  //Tag.findOne({ name: tag_name }, function(err, doc) {  // This line is case sensitive.
  Tag.findOne({ name: { $regex: new RegExp(tag_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newTag = new Tag(); 

      newTag.name = tag_name; 
      newTag.description = tag_description; 
      newTag.minor = tag_minor;
      newTag.major = tag_major;
      newTag.uuid = tag_uuid;
      newTag.type = tag_type;
      
      newTag.save(function(err) {

        if(!err) {
          res.json(201, {message: "Tag created with name: " + newTag.name });    
        } else {
          res.json(500, {message: "Could not create tag. Error: " + err});
        }

      });

    } else if(!err) {
      
      // User is trying to create a tag with a name that already exists. 
      res.json(403, {message: "Tag with that name already exists, please update instead of create or create a new tag with a different name."}); 

    } else {
      res.json(500, { message: err});
    } 
  });

}

exports.update = function(req, res) {
  
  var id = req.params.id; 
  var tag_name = req.body.tag_name;
  var tag_description = req.body.tag_description; 
  var tag_minor = req.body.tag_minor;
  var tag_major = req.body.tag_major;
  var tag_uuid = req.body.tag_uuid;
  var tag_type = req.body.tag_type;

  Tag.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = tag_name; 
        doc.description = tag_description; 
        doc.minor = tag_minor;
        doc.major = tag_major;
        doc.uuid = tag_uuid;
        doc.type = tag_type;
        doc.date_updated = new Date();

        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Tag updated: " + tag_name});    
          } else {
            res.json(500, {message: "Could not update tag. " + err});
          }  
        });
      } else if(!err) {
        res.json(404, { message: "Could not find tag."});
      } else {
        res.json(500, { message: "Could not update tag." + err});
      }
    }); 
}

exports.delete = function(req, res) {

  var id = req.params.id;
  Tag.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Tag removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find tag."});
    } else {
      res.json(403, {message: "Could not delete tag. " + err });
    }
  });
}