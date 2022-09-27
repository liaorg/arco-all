<!-- 右侧下拉标签 -->
<template>
  <a-dropdown
    :popup-max-height="true"
    trigger="hover"
    @select="changeActiveTab"
  >
    <a-button><icon-more /></a-button>
    <template #content>
      <a-doption
        v-for="tag in tagList"
        :key="tag.fullPath"
        :value="tag"
        :title="$t(tag.title)"
      >
        {{ $t(tag.title) }}
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { TagProps } from '@/store/modules/tab-bar/types';
  import { PropType } from 'vue';
  import { useRouter } from 'vue-router';

  defineProps({
    tagList: {
      type: Array as PropType<TagProps[]>,
      default: () => [],
    },
  });

  const router = useRouter();
  // 右侧点击查看全部标签，并按选择切换标签
  const changeActiveTab = (tab: any) => {
    router.push({ ...tab });
  };
</script>
