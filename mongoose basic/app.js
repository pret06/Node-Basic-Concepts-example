const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://amishbroemailcom:Password@cluster0.i7soa.mongodb.net/').then(()=>{
    console.log("DB connected SuccessFully")
}).catch(()=>{
    console.log("Error while connecting to DB")
})

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    isActive : Boolean,
    tags : [String],
    createdAt : {type : Date , default : Date.now}
})


const User = mongoose.model('User', userSchema)

async function runQuery(){
    try {
        // Create a new User
        const newUser = await User.create({
            name : "amish",
            email : "amishdeveloper006@gmail.com",
            age : 24,
            isActive : true,
            tags : ["developer"]
        })
        console.log("created user", newUser)
        await newUser.save()
    // const allUsers = await User.find({});
    // console.log(allUsers);

    // const getUserOfActiveFalse = await User.find({ isActive: true });
    // console.log(getUserOfActiveFalse);

    // const getJohnDoeUser = await User.findOne({ name: "John Doe" });
    // console.log(getJohnDoeUser);

    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserByUserId, "getLastCreatedUserByUserId");

    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);

    // const limitedUsers = await User.find().limit(5).skip(1);
    // console.log(limitedUsers);
    
    // const sortedUsers = await User.find().sort({ age: 1 });
    // console.log(sortedUsers);

    // const countDocuments = await User.countDocuments({ isActive: true });
    // console.log(countDocuments);

    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted user ->", deletedUser);

    const updateUser = await User.findByIdAndUpdate(
        newUser._id,
        {
          $set: { age: 100 },
          $push: { tags: "updated" },
        },
        { new: true }
      );
        
    } catch (error) {
        console.log(error)
    } finally {
        await mongoose.connection.close()
    }
}

runQuery()