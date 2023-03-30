import http from "../http-common";
import IResourceData from "../types/Resource";

const getAll = (page: number) => {
  return http.get<Array<IResourceData>>(`/resources?page=${page}`);
};

const get = (id: any) => {
  return http.get<IResourceData>(`/resources/${id}`);
};

const create = (data: IResourceData) => {
  return http.post<IResourceData>("/resources", data);
};

const update = (id: any, data: IResourceData) => {
  return http.put<any>(`/resources/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/resources/${id}`);
};

const ResourceService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ResourceService;
