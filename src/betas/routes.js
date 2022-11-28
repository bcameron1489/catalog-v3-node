const { Router } = require('express');
const { appendFile } = require('fs');
const controller = require('./controller')

const router = Router();

// Get Tags
router.get('/', controller.getTags);
// Get Tag by Id
router.get('/:id', controller.getTagById);
// flow tags
router.get('/flow/:id', controller.getFlowTags);
// list tags
router.get('/list/:id', controller.getListTags);
// segments tags
router.get('/segment/:id', controller.getSegmentTags);
// Create tag
router.post('/create-tag/:name', controller.createTag);
// Update Tag
router.put('/update-tag/:id', controller.updateTag);
// Delete Tag
router.delete('/delete-tag/:id', controller.deleteTag);
// Get Tag Relationshipts
router.get('/get-relationships/:id/:resource', controller.getTagRelationships);
// Get Tag Groups
router.get('/get-tag-groups/:nameFilter', controller.getTagGroups);
// Get Tag Group (by ID)
router.get('/get-tag-group/:id', controller.getTagGroupById);
// Create Tag Group
router.post('/create-tag-group/', controller.createTagGroup);
// Update Tag Group (this only updates name)
router.put('/update-tag-group/:id', controller.updateTagGroup);
// Delete Tag Group
router.delete('/delete-tag-group/:id', controller.deleteTagGroup);
// Get tag group relationships
router.get('/get-tag-group-relationships/:id', controller.getTagGroupRelationships);

module.exports = router