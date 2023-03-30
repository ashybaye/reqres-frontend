import http from "../http-common";
import IUserData from "../types/User";

const getAll = (page: number) => {
  return http.get<Array<IUserData>>(`/users?page=${page}`);
};

const get = (id: any) => {
  return http.get<IUserData>(`/users/${id}`);
};

const create = (data: IUserData) => {
  return http.post<IUserData>("/users", data);
};

const update = (id: any, data: IUserData) => {
  return http.put<any>(`/users/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/users/${id}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default UserService;
