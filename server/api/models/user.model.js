import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAARVBMVEX6+vqPj4////+ZmZnd3d2MjIyJiYmGhob29vbw8PDk5OTFxcWDg4OTk5Ojo6Pz8/PR0dGysrK9vb3Ly8vq6uqsrKzX19edyqDsAAAEeUlEQVR4nO2c2XalIBBFtRicEAWH///URtPJnZIr4kB5V+2XJN0vdVYVUMKBJCEIgiAIgiAIgiAIgiAIgiAIgiAIglgJ/BA7ko04BU3J287R8jK/sCCAnFujGatnGNNDxZNL6gEoLatT4Uhn5t9qZvvLyQHg+qbjxvRvuryWHOhr9azjhtL5ddRAbt5ImfKjbOwYveEse6vFkekydpQ+QNKlcklLmsq6jR3pMpDb12H/q5q0SrCPnNxILy3TxFbFDnYJszhcbmqkRZ0asB7D5U5Nh1gNtP55mdVkJVo1UPiOlx81InbMfwJspRanRiNNDVSrtTg1LUo1UKxPjBPDUPZpYAO0OCqEYqDUQWKkLvCpCRoxM/gWGyiGNevlfWpMEzv4Z2CsAxMjGEeXmmrd4n+fGmx1Fl5lCOsMytAqm7qAHldqYAxOjFODbdB0wUMmTbMRl5jcbhHTxQ7/kcZsKLPM5rHjf2DDZIZvOivCGjMSczifJeaTxsxHzWbNpnUG29bmpg4A2R46jBvEYOvNNnXNDNu+Zq8/53smScJnAIlt/CfQhmpBuAcAfWgPIIcidvAvrDuauc8Mwi1N4CFbzQh3AGYgrKMRKM8CoQw7BehjB/4rQccAGEfMTBNychY76L8AvnrhlNg6mRtQvTcAvaBwHgL+Z8HO9KwF5Uz2DTR6hRplcH1hvlD4q1EDum75CfBW4/KCuchmIPfrBKRF79BKJvdcVS+uN6JuL+I6Ba7fmwFlPeBdX56BvNJ/e4Kk0N0VSuwH6CstftMjMqErjE3/OwD61tRZ9lBuMsuYaa9nOZ/kNGVrdaqUyhzuR6rtON1uiB1ZGJDkRV+OXeVox7Iv8kuNlVfg118JgiDQAbsRXUjel3wnyj7m7brpjtyg2W5oU0VrdaAwzLXA+yFlymycz0/grgde+ghbixB1jJYaWrW7lFlOhJsbMK7c7/MnOzs3UCx/54dy+vUAMEdJSU8/sgk9JvMUw04ttNAbGb6catvOtziylpHmRC2h10u8xZx5mn7skDn5BNqJOVJLOj0ZQGJIDD9u/Y8g5pMmgCAzxioxp2nZ4Mfy41zX1iZPtoeYc4+ht3iyPcSc2jZ/VKMZfivTh5Ndm9AfOZ1Jfa5zA8yRdXaypebIOhP12d7g/Lg6O/8pCuiOExPBtH1UamK8EXLYLqCKsj87bLgy80ZLFHcgFH7PZa1DsDjuQOD7F5qQ0Xw17e5qVMQL6Gutv0vEvUpX7fkpIGK/dVTtd3omoj8TCC3bKTlSx3+wAfiQ7ZAcIQ0G2yYUVbp5+cxYh8PlDMCN3FRrmbQY0vIFNKPOwi+dZgPHkZZvGj6ooGLLJimxo3+lN2rtGiqVsjjvnLnBM2rlP7UJpTSP7mX6GxfaONRfTpg3Ktx/CsEMj2/LWsAF2Hfzy+Zf72Y/Wn0mjdNr57Yt0Cv5AuZH59vKmkHrOwuX+2MwtpqN2tdQ8s1/b1/Rl+Vsr3M/+iZBYfkLB49tkSAIgiAIgiAIgiAIgiAIgiAIgiCIC/IPYNg9bl17nywAAAAASUVORK5CYII="
    },

}, {Timestamp:true})

const User=mongoose.model('User',userSchema)

export default User;