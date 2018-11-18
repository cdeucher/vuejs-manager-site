<template>
  <div>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Dashboard</router-link>
                <router-link to="/register" class="navbar-brand">CADASTRO</router-link>
                <router-link to="/login" class="navbar-brand">Login</router-link>
                <router-link to="/signup" class="navbar-brand">Signup</router-link>
            </div>
        </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
 export default {
     name: 'app-menu'
 }
</script>
