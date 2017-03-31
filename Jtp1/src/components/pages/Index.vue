<template>
  <div id="Index">
    <MyHeader></MyHeader>
    <MySidebar></MySidebar>
    <router-view name="pcontent"></router-view>
  </div>
</template>

<script>
  import MyHeader from '@/components/common/MyHeader'
  import MySidebar from '@/components/common/MySidebar'
  export default {
    name: 'Index',
    components: {
      MyHeader,
      MySidebar
    }
  }

</script>


<style>

</style>
