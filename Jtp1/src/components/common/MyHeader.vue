<template>
  <div id="MyHeader">

    <header class="navbar navbar-fixed-top bg-light">
      <div class="navbar-branding">
        <router-link to="/">
        <a class="navbar-brand"> <b>Jtp </b>1
        </a>
        </router-link>
        <span id="toggle_sidemenu_l" class="glyphicons glyphicons-show_lines"></span>
        <ul class="nav navbar-nav pull-right hidden">
          <li>
            <a href="#" class="sidebar-menu-toggle">
              <span class="octicon octicon-ruby fs20 mr10 pull-right "></span>
            </a>
          </li>
        </ul>
      </div>
      <ul class="nav navbar-nav navbar-left">
        <li class="hidden-xs">
          <a class="request-fullscreen toggle-active" href="#">
            <span class="octicon octicon-screen-full fs18"></span>
          </a>
        </li>
      </ul>
      <form class="navbar-form navbar-left navbar-search ml5" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search..." value="Search...">
        </div>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle fw600 p15" data-toggle="dropdown">
            <span class="account">Jophy Yao</span>
            <span class="caret caret-tp"></span>
          </a>
          <ul class="dropdown-menu dropdown-persist pn w250 bg-white" role="menu">
            <li class="bg-light br-b br-light p8">
                            <span class="pull-left ml10">
                                <select id="user-status">
                                    <optgroup label="Current Status:">
                                        <option value="1-1">Away</option>
                                        <option value="1-2">Offline</option>
                                        <option value="1-3" selected="selected">Online</option>
                                    </optgroup>
                                </select>
                            </span>

              <span class="pull-right mr10">
                                <select id="user-role">
                                    <optgroup label="Logged in As:">
                                        <option value="1-1">Client</option>
                                        <option value="1-2">Editor</option>
                                        <option value="1-3" selected="selected">Admin</option>
                                    </optgroup>
                                </select>
                            </span>
              <div class="clearfix"></div>

            </li>
          </ul>
        </li>
      </ul>

    </header>
    <!-- End: Header -->


  </div>
</template>

<script>
  export default {
    name: 'MyHeader'
  }
</script>


<style>
  .account {
    line-height: 26px;
  }
</style>
