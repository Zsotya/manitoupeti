<template>
  <div class="sidebar">
    <div class="company-name">
      <h3>ManitouPeti</h3>
    </div>
    <ul>
      <li>
        <a href="#" class="nav-link">
          <i class="fas fa-home mr-2"></i> Dashboard
        </a>
      </li>
      <li>
        <a href="https://www.google.com" class="nav-link">
          <i class="fas fa-chart-bar mr-2"></i> Statistics
        </a>
      </li>
      <li>
        <a href="https://www.google.com" class="nav-link">
          <i class="fas fa-book mr-2"></i> Paragraph Management
        </a>
      </li>
      <li>
        <a href="https://www.google.com" class="nav-link">
          <i class="fas fa-film mr-2"></i> Our Films Management
        </a>
      </li>
      <li>
        <a href="https://www.google.com" class="nav-link">
          <i class="fas fa-cogs mr-2"></i> Machines Management
        </a>
      </li>
      <li>
        <a href="https://www.google.com" class="nav-link">
          <i class="fas fa-briefcase mr-2"></i> Career Management
        </a>
      </li>
      <li>
        <a href="https://www.google.com" class="nav-link">
          <i class="fas fa-user mr-2"></i> Admin Management
        </a>
      </li>
    </ul>
    <ul class="logout">
      <li>
        <a href="#" class="nav-link">
          <i class="fas fa-sign-out-alt mr-2"></i> Logout
        </a>
      </li>
    </ul>
  </div>
</template>

<script></script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #343a40;
  color: #ffffff;
  height: 100vh;
  padding-top: 20px;
}

.company-name h3 {
  color: #ffffff;
}

.nav-link {
  color: #ffffff;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  background-color: #495057;
}

.nav-link i {
  width: 1.25rem;
}

.logout {
  position: absolute;
  bottom: 10px;
}
</style>
