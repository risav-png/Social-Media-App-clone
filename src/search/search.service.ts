import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/users.schema';

@Injectable()
export class SearchService {
    constructor(@InjectModel(User.name)private readonly userModel:Model<User>){}

    async searchUsers(query:string) {
        return await this.userModel.find({
            $or: [
                {username:{$regex:query,$options:'i'}},
                {email: {$regex:query, $options:'i'}},
            ],
        })
        .select('username email profilePicture')
    }

}
