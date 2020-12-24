// Setup mongoose and connection to atlas DB using .env
let mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGO_URI;

// let url='mongodb+srv://roldoz:roldoz@cluster0.uxevh.mongodb.net/database?retryWrites=true&w=majority'
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });

//Create person Schema
let personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        default : 'unknown'
    },
    age :{type: Number },
    favoriteFoods :[{
        type : String
    }]
})

//Create and Save a Record of a Model
const people = mongoose.model('person',personSchema)
const personInfo = new people({
    name : 'Sami',
    age : '22',
    favoriteFoods : ['spagetti', 'bsisa','rfissa']
})
personInfo.save(function(err,data){
    if (err)
     console.log('error')
     else
   console.log(data)
})

//Create Many Records with model.create()
const arrayOfPeople = [
    {name: 'Ahmed', age: 40, favoriteFoods:['pizza'] },
    {name: 'Layla', age: 30, favoriteFoods:['Kosksi','baqlawa','burrito'] },
    {name: 'John', age: 23, favoriteFoods:['fried chicken','oats','burrito'] },
    {name: 'Luigi', age: 10, favoriteFoods:['fruits','biscuits'] },
    {name:'Mary',age:28, favoriteFoods:['Cheese']}
]
    people.create(arrayOfPeople)

//Simple search Your Database
  people.find({name:'John'},function(err,data){
    if (err)
    console.log('error')
    else
  console.log(data)
  })

// Return a Single Matching Document from database
people.findOne({favoriteFoods:['pizza']},function(err,data){
    if (err)
    console.log('error')
    else
  console.log(data)})  

//Search by ID
people.findById('5fe4c933b1a813100ca291b1',function(err,data){
    if (err)
    console.log('error')
    else
  console.log(data)})

//  Classic method for find edit and save
people.findById('5fe4c933b1a813100ca291b2',function(err,data){
    if (err) 
    console.log('error')
    else
    data.favoriteFoods.push('hamburger')
    data.save()
})

// Same operation but with model.findOneAndUpdate()
const updt=(personName)=>{
people.findOneAndUpdate({name:personName},{age:20},{ new: true },function(err,data){
  if (err)
  console.log('error')
  else
console.log(data)})
}

//Delete One Document Using model.findByIdAndRemove
const rmv=(personId)=>{
  people.findOneAndUpdate((personId),function(err,data){
    if (err)
    console.log('error')
    else
  console.log(data)})
  }

  //Delete Many Documents with model.remove()
people.remove({name:'Mary'},function(err,data){
  if (err)
  console.log('error')
  else
console.log(data)})

//Search with Query Helpers
people.find({favoriteFoods:['burrito']}).sort({name:1}).limit(2).select('-age').exec().then(data => {
  console.log(data)
})
.catch(err => {
  console.error(err)
})