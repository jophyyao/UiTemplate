<template>
  <div id="MySiderbar">

    <!-- Start: Sidebar -->
    <aside id="sidebar_left" class="nano nano-light sidebar-light">
      <div class="nano-content">


        <!-- sidebar menu -->
        <ul class="nav sidebar-menu">
          <li class="sidebar-label pt15">Menu1</li>
          <li>
            <router-link to="/page1/index">
              <span class="glyphicons glyphicons-book_open"></span>
              <span class="sidebar-title">page1</span>
            </router-link>
          </li>


          <li class="sidebar-label pt15">Menu2</li>
          <li>
            <a class="accordion-toggle" href="#">
              <span class="glyphicons glyphicons-fire"></span>
              <span class="sidebar-title">m2</span>
              <span class="caret"></span>
            </a>
            <ul class="nav sub-nav">
              <li>
                <a href="#">
                  <span class="glyphicons glyphicons-book"></span>sub1 </a>
              </li>
              <li>
                <a href="#">
                  <span class="glyphicons glyphicons-show_big_thumbnails"></span>sub2 </a>
              </li>
              <li>
                <a href="#">
                  <span class="glyphicons glyphicons-sampler"></span>sub3 </a>
              </li>x
            </ul>
          </li>
        </ul>
        <div class="sidebar-toggle-mini">
          <a href="#">
            <span class="fa fa-sign-out"></span>
          </a>
        </div>
      </div>
    </aside>


  </div>
</template>

<script>
  export default {
    name: 'MySiderbar'
  }
</script>


<style>

</style>
