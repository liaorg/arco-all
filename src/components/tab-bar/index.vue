<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box" :style="{ paddingLeft: paddingLeft + 'px' }">
        <!-- 左移 -->
        <tab-button
          :is-scroll="isScroll"
          :disabled="disabledLeft"
          :handle-button-click="handleButtonClick"
        />
        <!-- 标签内容 -->
        <div class="tab-bar-scroll">
          <div ref="wrapperRef" class="tags-wrap">
            <tab-item
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              :index="index"
              :item-data="tag"
            />
          </div>
        </div>
        <!-- 右移 -->
        <tab-button
          type="next"
          :is-scroll="isScroll"
          :disabled="disabledRight"
          :handle-button-click="handleButtonClick"
        />

        <div class="tag-bar-operation">
          <!-- 右侧下拉标签 -->
          <tab-dropdown :tag-list="tagList" />
        </div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, onUnmounted, shallowRef } from 'vue';
  import { RouteLocationNormalized, useRoute } from 'vue-router';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore } from '@/store';
  import { useDebounceFn } from '@vueuse/shared';
  import { useResizeObserver } from '@vueuse/core';
  import tabItem from './tab-item.vue';
  import TabDropdown from './tab-dropdown.vue';
  import TabButton from './tab-button.vue';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();

  const affixRef = ref();
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });
  const offsetTop = computed(() => {
    return appStore.navbar ? 60 : 0;
  });

  // 点击左移和右移
  const paddingLeft = ref(15);
  const wrapperRef = shallowRef<HTMLElement>();
  const isScroll = ref(false);
  const disabledLeft = ref(false);
  const disabledRight = ref(false);
  const currnetRoute = useRoute();

  // 改变滚动条位置
  const setWrapperScrollLeft = (offset: number) => {
    if (wrapperRef.value) {
      wrapperRef.value.scrollLeft = offset;
      disabledLeft.value = !wrapperRef.value.scrollLeft;
      disabledRight.value =
        wrapperRef.value.scrollWidth - wrapperRef.value.scrollLeft <=
        wrapperRef.value.clientWidth;
    }
  };
  // 滚动条定位到当前标签位置
  const setActiveTabOffset = (tabIndex: number) => {
    setWrapperScrollLeft(tabIndex * 60);
  };

  // 监听宽度变化
  // 防抖
  const scrollDebounced = useDebounceFn((el: HTMLElement) => {
    isScroll.value = el.scrollWidth > el.clientWidth;
    if (isScroll.value) {
      paddingLeft.value = 0;
    } else {
      paddingLeft.value = 15;
    }
    disabledLeft.value = !el.scrollLeft;
    disabledRight.value = el.scrollWidth - el.scrollLeft <= el.clientWidth;
    const tabIndex = tagList.value.findIndex(
      (tag) => tag.fullPath === currnetRoute.fullPath
    );
    // 改变滚动条位置
    setActiveTabOffset(tabIndex);
  }, 200);
  useResizeObserver(wrapperRef, (entries) => {
    const [entry] = entries;
    scrollDebounced(entry.target as HTMLElement);
  });

  const handleButtonClick = (type: string) => {
    if (wrapperRef.value) {
      let offset = wrapperRef.value.scrollLeft as number;
      if (type === 'previous' && offset) {
        // 向左移
        offset -= 108;
        setWrapperScrollLeft(offset);
      } else if (type === 'next') {
        // 向右移
        const hasOffsetRight =
          wrapperRef.value.scrollWidth - wrapperRef.value.scrollLeft >
          wrapperRef.value.clientWidth;
        if (hasOffsetRight) {
          offset += 108;
          setWrapperScrollLeft(offset);
        }
      }
    }
  };

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition();
    }
  );
  // 监听路由变化
  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
      setTimeout(() => {
        setWrapperScrollLeft(tagList.value.length * 160);
      });
    } else {
      const tabIndex = tagList.value.findIndex(
        (tag) => tag.fullPath === route.fullPath
      );
      // 改变滚动条位置
      setActiveTabOffset(tabIndex);
    }
  }, true);

  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);

    .tab-bar-box {
      display: flex;
      padding: 0 0 0 10px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);

      .tab-bar-scroll {
        flex: 1;
        height: 32px;
        overflow: hidden;

        .tags-wrap {
          height: 49px;
          padding: 4px 0;
          overflow-x: auto;
          white-space: nowrap;

          :deep(.arco-tag) {
            display: inline-flex;
            align-items: center;
            margin-right: 6px;
            cursor: pointer;

            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .tag-bar-operation {
      width: 100px;
      height: 32px;
    }
  }
</style>
