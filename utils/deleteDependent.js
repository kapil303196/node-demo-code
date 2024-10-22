/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Plantmaster = require('../model/Plantmaster');
let Category = require('../model/Category');
let Otp = require('../model/Otp');
let Token = require('../model/Token');
let Notification = require('../model/Notification');
let Plantation = require('../model/Plantation');
let Plant = require('../model/Plant');
let Project = require('../model/Project');
let Admin = require('../model/Admin');
let User = require('../model/User');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deletePlantmaster = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Plantmaster,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const PlantmasterFilter = { $or: [{ type : { $in : category } }] };
      const PlantmasterCnt = await dbService.deleteMany(Plantmaster,PlantmasterFilter);

      let deleted  = await dbService.deleteMany(Category,filter);
      let response = { Plantmaster :PlantmasterCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOtp = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Otp,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteToken = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Token,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNotification = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Notification,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlantation = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Plantation,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlant = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Plant,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProject = async (filter) =>{
  try {
    let project = await dbService.findMany(Project,filter);
    if (project && project.length){
      project = project.map((obj) => obj.id);

      const PlantationFilter = { $or: [{ project : { $in : project } }] };
      const PlantationCnt = await dbService.deleteMany(Plantation,PlantationFilter);

      const PlantFilter = { $or: [{ project : { $in : project } }] };
      const PlantCnt = await dbService.deleteMany(Plant,PlantFilter);

      let deleted  = await dbService.deleteMany(Project,filter);
      let response = {
        Plantation :PlantationCnt,
        Plant :PlantCnt,
      };
      return response; 
    } else {
      return {  project : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAdmin = async (filter) =>{
  try {
    let admin = await dbService.findMany(Admin,filter);
    if (admin && admin.length){
      admin = admin.map((obj) => obj.id);

      const userTokensFilter = { $or: [{ userId : { $in : admin } },{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : admin } },{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Admin,filter);
      let response = {
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  admin : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const NotificationFilter = { $or: [{ user : { $in : user } }] };
      const NotificationCnt = await dbService.deleteMany(Notification,NotificationFilter);

      const PlantationFilter = { $or: [{ planter : { $in : user } }] };
      const PlantationCnt = await dbService.deleteMany(Plantation,PlantationFilter);

      const ProjectFilter = { $or: [{ planter : { $in : user } }] };
      const ProjectCnt = await dbService.deleteMany(Project,ProjectFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        Notification :NotificationCnt,
        Plantation :PlantationCnt,
        Project :ProjectCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlantmaster = async (filter) =>{
  try {
    const PlantmasterCnt =  await dbService.count(Plantmaster,filter);
    return { Plantmaster : PlantmasterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const PlantmasterFilter = { $or: [{ type : { $in : category } }] };
      const PlantmasterCnt =  await dbService.count(Plantmaster,PlantmasterFilter);

      let response = { Plantmaster : PlantmasterCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOtp = async (filter) =>{
  try {
    const OtpCnt =  await dbService.count(Otp,filter);
    return { Otp : OtpCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countToken = async (filter) =>{
  try {
    const TokenCnt =  await dbService.count(Token,filter);
    return { Token : TokenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countNotification = async (filter) =>{
  try {
    const NotificationCnt =  await dbService.count(Notification,filter);
    return { Notification : NotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlantation = async (filter) =>{
  try {
    const PlantationCnt =  await dbService.count(Plantation,filter);
    return { Plantation : PlantationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlant = async (filter) =>{
  try {
    const PlantCnt =  await dbService.count(Plant,filter);
    return { Plant : PlantCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countProject = async (filter) =>{
  try {
    let project = await dbService.findMany(Project,filter);
    if (project && project.length){
      project = project.map((obj) => obj.id);

      const PlantationFilter = { $or: [{ project : { $in : project } }] };
      const PlantationCnt =  await dbService.count(Plantation,PlantationFilter);

      const PlantFilter = { $or: [{ project : { $in : project } }] };
      const PlantCnt =  await dbService.count(Plant,PlantFilter);

      let response = {
        Plantation : PlantationCnt,
        Plant : PlantCnt,
      };
      return response; 
    } else {
      return {  project : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAdmin = async (filter) =>{
  try {
    let admin = await dbService.findMany(Admin,filter);
    if (admin && admin.length){
      admin = admin.map((obj) => obj.id);

      const userTokensFilter = { $or: [{ userId : { $in : admin } },{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : admin } },{ addedBy : { $in : admin } },{ updatedBy : { $in : admin } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  admin : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const NotificationFilter = { $or: [{ user : { $in : user } }] };
      const NotificationCnt =  await dbService.count(Notification,NotificationFilter);

      const PlantationFilter = { $or: [{ planter : { $in : user } }] };
      const PlantationCnt =  await dbService.count(Plantation,PlantationFilter);

      const ProjectFilter = { $or: [{ planter : { $in : user } }] };
      const ProjectCnt =  await dbService.count(Project,ProjectFilter);

      let response = {
        Notification : NotificationCnt,
        Plantation : PlantationCnt,
        Project : ProjectCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlantmaster = async (filter,updateBody) =>{  
  try {
    const PlantmasterCnt =  await dbService.updateMany(Plantmaster,filter);
    return { Plantmaster : PlantmasterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findMany(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const PlantmasterFilter = { '$or': [{ type : { '$in' : category } }] };
      const PlantmasterCnt = await dbService.updateMany(Plantmaster,PlantmasterFilter,updateBody);
      let updated = await dbService.updateMany(Category,filter,updateBody);

      let response = { Plantmaster :PlantmasterCnt, };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOtp = async (filter,updateBody) =>{  
  try {
    const OtpCnt =  await dbService.updateMany(Otp,filter);
    return { Otp : OtpCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteToken = async (filter,updateBody) =>{  
  try {
    const TokenCnt =  await dbService.updateMany(Token,filter);
    return { Token : TokenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNotification = async (filter,updateBody) =>{  
  try {
    const NotificationCnt =  await dbService.updateMany(Notification,filter);
    return { Notification : NotificationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlantation = async (filter,updateBody) =>{  
  try {
    const PlantationCnt =  await dbService.updateMany(Plantation,filter);
    return { Plantation : PlantationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlant = async (filter,updateBody) =>{  
  try {
    const PlantCnt =  await dbService.updateMany(Plant,filter);
    return { Plant : PlantCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProject = async (filter,updateBody) =>{  
  try {
    let project = await dbService.findMany(Project,filter, { id:1 });
    if (project.length){
      project = project.map((obj) => obj.id);

      const PlantationFilter = { '$or': [{ project : { '$in' : project } }] };
      const PlantationCnt = await dbService.updateMany(Plantation,PlantationFilter,updateBody);

      const PlantFilter = { '$or': [{ project : { '$in' : project } }] };
      const PlantCnt = await dbService.updateMany(Plant,PlantFilter,updateBody);
      let updated = await dbService.updateMany(Project,filter,updateBody);

      let response = {
        Plantation :PlantationCnt,
        Plant :PlantCnt,
      };
      return response;
    } else {
      return {  project : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAdmin = async (filter,updateBody) =>{  
  try {
    let admin = await dbService.findMany(Admin,filter, { id:1 });
    if (admin.length){
      admin = admin.map((obj) => obj.id);

      const userTokensFilter = { '$or': [{ userId : { '$in' : admin } },{ addedBy : { '$in' : admin } },{ updatedBy : { '$in' : admin } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : admin } },{ updatedBy : { '$in' : admin } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : admin } },{ updatedBy : { '$in' : admin } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : admin } },{ updatedBy : { '$in' : admin } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : admin } },{ addedBy : { '$in' : admin } },{ updatedBy : { '$in' : admin } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Admin,filter,updateBody);

      let response = {
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  admin : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const NotificationFilter = { '$or': [{ user : { '$in' : user } }] };
      const NotificationCnt = await dbService.updateMany(Notification,NotificationFilter,updateBody);

      const PlantationFilter = { '$or': [{ planter : { '$in' : user } }] };
      const PlantationCnt = await dbService.updateMany(Plantation,PlantationFilter,updateBody);

      const ProjectFilter = { '$or': [{ planter : { '$in' : user } }] };
      const ProjectCnt = await dbService.updateMany(Project,ProjectFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        Notification :NotificationCnt,
        Plantation :PlantationCnt,
        Project :ProjectCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deletePlantmaster,
  deleteCategory,
  deleteOtp,
  deleteToken,
  deleteNotification,
  deletePlantation,
  deletePlant,
  deleteProject,
  deleteAdmin,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countPlantmaster,
  countCategory,
  countOtp,
  countToken,
  countNotification,
  countPlantation,
  countPlant,
  countProject,
  countAdmin,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeletePlantmaster,
  softDeleteCategory,
  softDeleteOtp,
  softDeleteToken,
  softDeleteNotification,
  softDeletePlantation,
  softDeletePlant,
  softDeleteProject,
  softDeleteAdmin,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
