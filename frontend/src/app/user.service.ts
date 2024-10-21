import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blogData, blogResponse, httpresponsemodel, loginhttpresponsemodel, newPassword, profileData, userDetails, userlogin, userregister, verifyOtp } from './model/usermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) {}
  private _api:string='http://localhost:3000'

  userregister(data:userregister):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/userRegister`,data)
  }
  verifyOtp(data:verifyOtp):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/verifyOtp`,data)
  }
  userLogin(data:userlogin):Observable<loginhttpresponsemodel>{
    return this._http.post<loginhttpresponsemodel>(`${this._api}/user/login`,data)
  }
  createBlog(data:blogData):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/createBlog`,data)
  }
  editBlog(data:blogData):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/editBlog`,data)
  }
  deleteBlog(blogId:string):Observable<httpresponsemodel>{
    console.log('deleteblog service');
    return this._http.delete<httpresponsemodel>(`${this._api}/user/deleteBlog/${blogId}`)
  }
  PersonalBlogs(userId:string):Observable<blogResponse[]>{
    return this._http.get<blogResponse[]>(`${this._api}/user/PersonalBlogs/${userId}`)
  }
  AllBlogs():Observable<blogResponse[]>{
    console.log('all blogs service frondend');
    return this._http.get<blogResponse[]>(`${this._api}/user/AllBlogs`)
  }
  SingleBlog(blogId:string):Observable<blogResponse>{
    return this._http.get<blogResponse>(`${this._api}/user/SingleBlog/${blogId}`)
  }
  changeProfilePicture(data:profileData):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/changeProfilePicture`,data)
  }
  userDetails(_id:string):Observable<userDetails>{
    return this._http.get<userDetails>(`${this._api}/user/userDetails/${_id}`)
  }
  editUserName(data:userDetails):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/editUserName`,data)
  }
  editUserEmail(data:userDetails):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/editUserEmail`,data)
  }
  verifyEmail(data:Object):Observable<httpresponsemodel>{
    console.log('data of verifyEmail:',data);
    
    return this._http.post<httpresponsemodel>(`${this._api}/user/verifyEmail`,data)
  }
  newPassword(data:newPassword):Observable<httpresponsemodel>{
    return this._http.post<httpresponsemodel>(`${this._api}/user/newPassword`,data)
  }
  refreshToken(data: any): Observable<any> {
    console.log('refreshToken service');
    return this._http.post(`${this._api}/auth/refresh-token`, data); // Assuming /refresh-token is the endpoint
  }
}
