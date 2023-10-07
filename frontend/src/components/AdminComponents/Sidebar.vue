<template>
  <div class="sidebar">
    <div class="company-name">
      <h3>ManitouPeti</h3>
    </div>
    <ul>
      <li v-for="link in links" :key="link.path">
        <router-link :to="link.path" class="nav-link">
          <i :class="link.iconClass"></i> {{ link.label }}
        </router-link>
      </li>
    </ul>
    <ul class="logout">
      <li>
        <a href="#" class="nav-link" @click="logout">
          <i class="fas fa-sign-out-alt mr-2"></i> Logout
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from "@/router";
import authService from "@/services/authService";

const links = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    iconClass: "fas fa-home mr-2",
  },
  {
    path: "/admin/statistics",
    label: "Statistics",
    iconClass: "fas fa-chart-bar mr-2",
  },
  {
    path: "/admin/paragraph-management",
    label: "Paragraph Management",
    iconClass: "fas fa-book mr-2",
  },
  {
    path: "/admin/ourfilms-management",
    label: "Our Films Management",
    iconClass: "fas fa-film mr-2",
  },
  {
    path: "/admin/machines-management",
    label: "Machines Management",
    iconClass: "fas fa-cogs mr-2",
  },
  {
    path: "/admin/career-management",
    label: "Career Management",
    iconClass: "fas fa-briefcase mr-2",
  },
  {
    path: "/admin/admin-management",
    label: "Admin Management",
    iconClass: "fas fa-user mr-2",
  },
];

const logout = () => {
  authService.logoutUser();
  router.push("/admin");
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #343a40;
  color: #ffffff;
  height: 100vh;
  padding-top: 20px;
  flex-shrink: 0; /* Enélkül összezsugorodna, ha széles a tartalom mellette */
}

.company-name h3 {
  color: #ffffff;
}

.nav-link {
  color: #ffffff;
  display: flex;
  align-items: center;
}

.router-link-active {
  background-color: #495057;
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
