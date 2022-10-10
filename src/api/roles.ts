import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface RoleRecord {
  id: string;
  number: number;
  operations: string;
  name: string;
  type: string;
  isDefault: string;
  users: string[];
  business: string[];
  menus: string[];
  description: string;
}

export interface RoleParams extends Partial<RoleRecord> {
  current: number;
  pageSize?: number;
}

export interface Roles {
  list: RoleRecord[];
  total: number;
}

export function queryRoles(params: RoleParams) {
  return axios.get<Roles>('/api/roles', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}
