<!-- 左右移动标签 -->
<template>
  <div
    v-if="isScroll"
    class="tabs-bar-button"
    :class="{ 'tabs-bar-button-disabled': disabled }"
    @click="handleClick"
  >
    <span
      class="arco-icon-hover"
      :class="{ 'arco-icon-hover-disabled': disabled }"
    >
      <icon-left v-if="type === 'previous'" />
      <icon-right v-if="type === 'next'" />
    </span>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    isScroll: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    type: {
      type: String,
      default: () => 'previous',
    },
    handleButtonClick: {
      type: Function,
      default: (type: string) => type,
    },
  });
  const handleClick = () => {
    props.handleButtonClick(props.type);
  };
</script>

<style scoped lang="less">
  .tabs-bar-button {
    display: flex;
    align-items: center;
    margin-right: 6px;
    margin-left: 10px;

    .arco-icon-hover-disabled {
      cursor: not-allowed;
    }
  }

  .tabs-bar-button-disabled {
    color: var(--color-text-4);
  }
</style>
