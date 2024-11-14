import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(User.name)private readonly userModel:Model<User>){}

    async getUserProfile(id:string){
        return await this.userModel.findById(id).select('-password');
    }

async updateProfile(id:string,updateData:Partial<User>){
    const updatedUser =await this.userModel.findByIdAndUpdate(id,updateData,{
        new: true,
        runValidators:true,
    }).select('-password');

    if(!updatedUser){
        throw new NotFoundException('User not Found');
    }
    return updatedUser
}

async addFriend(userId:string,friendId:string){
    const user = await this.userModel.findById(userId);
    const friend = await this.userModel.findById(friendId);

    if(!user || !friend){
        throw new NotFoundException('User or Friend Not found');
    }

    if(!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        friend.friends.push(userId);

        await user.save();
        await friend.save();

    }
    return user;
}

async deleteProfilePicture(userId:string){
    const user = await this.userModel.findById(userId);
if(user.profilePicture)
{
    user.profilePicture = null;
    await user.save();
}
else{
    throw new NotFoundException('No Profile Picture to Delete');
    
}
return {message:'Profile Picture deleted Successfully'};

}


}
