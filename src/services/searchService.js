
import * as request from '~/utils/request';

export const search=async(q, type='less')=>{
    //request của Utils/request.js
   try{
        const res= await request.get('users/search',{
            params:{
                q,
                type,
            }
        })
        return res.data;
   }catch(error){
        console.log(error);
   }
}
