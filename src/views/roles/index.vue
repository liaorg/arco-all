<template>
  <div class="container">
    <a-space class="general-space" direction="vertical" size="mini" fill>
      <a-space size="mini">
        <a-button-group>
          <a-button type="text" size="small">
            <template #icon><icon-plus /></template>
            Item1
          </a-button>
          <a-button type="text" size="small">
            <template #icon><icon-plus /></template>
            Item1
          </a-button>
          <a-button type="text" size="small">
            <template #icon><icon-user /></template>
            Item1
          </a-button>
        </a-button-group>
      </a-space>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        page-position="bl"
        table-layout-fixed
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('roles.columns.number')"
            data-index="number"
          />
          <a-table-column
            :title="$t('roles.columns.operations')"
            data-index="operations"
          >
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('roles.columns.operations.edit') }}
              </a-button>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('roles.columns.operations.del') }}
              </a-button>
            </template>
          </a-table-column>
          <a-table-column :title="$t('roles.columns.name')" data-index="name" />
          <a-table-column :title="$t('roles.columns.type')" data-index="type" />
          <a-table-column
            :title="$t('roles.columns.isDefault')"
            data-index="isDefault"
          />
          <a-table-column
            :title="$t('roles.columns.users')"
            data-index="users"
          />
          <a-table-column
            :title="$t('roles.columns.business')"
            data-index="business"
          />
          <a-table-column
            :title="$t('roles.columns.menus')"
            data-index="menus"
          />
          <a-table-column
            :title="$t('roles.columns.description')"
            data-index="description"
          />
        </template>
      </a-table>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { RoleParams, RoleRecord, queryRoles } from '@/api/roles';
  import { PaginationProps } from '@arco-design/web-vue';

  // 加载动画
  const { loading, setLoading } = useLoading(true);
  // 分页参数
  const basePagination: Pagination = {
    current: 1,
  };
  const pagination = reactive({
    // 分页选择器的大小
    size: 'small',
    // 是否显示数据总数
    showTotal: true,
    // 是否显示跳转
    showJumper: true,
    // 是否显示数据条数选择器
    showPageSize: true,
    // 数据条数选择器的选项列表
    pageSizeOptions: [10, 20, 50, 80, 100, 200, 500],
    ...basePagination,
  }) as PaginationProps;
  // 表数据
  const renderData = ref<RoleRecord[]>([]);
  // 查询数据
  const fetchData = async (
    params: RoleParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryRoles(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };
  const onPageSizeChange = (pageSize: number) => {
    fetchData({ ...basePagination, pageSize });
  };

  fetchData();
</script>

<!-- // 手动缓存页面 -->
<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 8px;
    background-color: #fff;

    .general-space {
      padding-bottom: 8px;
      border: 1px solid var(--color-neutral-3);
    }
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }

  :deep(.arco-pagination) {
    padding-left: 15px;
  }

  :deep(.arco-table-tr-empty) {
    .arco-table-td {
      border: none;
    }
  }
</style>
