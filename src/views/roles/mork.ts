import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'number|1-3': /[0-9]/,
      'operations': ['edit', 'del'],
      'name|4-8': /[A-Z]/,
      'type|1': ['系统管理员', '系统审计员', '系统安全员'],
      'isDefault|1': ['是', '否'],
      'users': ['edit', 'del'],
      'business': ['edit', 'del'],
      'menus': ['edit', 'del'],
      'description|4-8': /[A-Z]/,
    },
  ],
});

setupMock({
  mock: false,
  setup() {
    Mock.mock(new RegExp('/api/roles'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      });
    });
  },
});
