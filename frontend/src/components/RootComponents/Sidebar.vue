<template>
  <div class="sidebar">
    <div class="company-name">
      <h3>ManitouPeti</h3>
    </div>
    <ul>
      <li v-for="link in links" :key="link.path">
        <router-link :to="link.path" class="nav-link" v-if="link.show">
          <i :class="link.iconClass"></i> {{ link.label }}
        </router-link>
      </li>
    </ul>
    <ul class="logout">
      <li>
        <a href="#" class="nav-link" @click="logout">
          <i class="fas fa-sign-out-alt mr-2"></i> Kijelentkezés
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from "@/router";
import authService from "@/services/authService";

// Útvonalak meghatározása
const links = [
  {
    path: "/admin/dashboard",
    label: "Irányítópult",
    iconClass: "fas fa-home mr-2",
    show: true,
  },
  {
    path: "/admin/bookings",
    label: "Megrendelések",
    iconClass: "far fa-calendar-alt mr-2",
    show: true,
  },
  {
    path: "/admin/statistics",
    label: "Statisztika",
    iconClass: "fas fa-chart-bar mr-2",
    show: true,
  },
  {
    path: "/admin/paragraph-management",
    label: "Paragrafus Menedzsment",
    iconClass: "fas fa-book mr-2",
    show: true,
  },
  {
    path: "/admin/ourfilms-management",
    label: "Munkáink Menedzsment",
    iconClass: "fas fa-film mr-2",
    show: true,
  },
  {
    path: "/admin/machines-management",
    label: "Gépeink Menedzsment",
    iconClass: "fas fa-cogs mr-2",
    show: true,
  },
  {
    path: "/admin/career-management",
    label: "Karrier Menedzsment",
    iconClass: "fas fa-briefcase mr-2",
    show: true,
  },
  {
    path: "/admin/admin-management",
    label: "Admin Menedzsment",
    iconClass: "fas fa-user mr-2",
    show: localStorage.isMainAdmin === "true",
  },
];

// Kijelentkezés
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
  text-align: center;
  margin-bottom: 10px;
}

.nav-link {
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.router-link-active {
  background-color: #495057;
}

.nav-link:hover {
  background-color: #495057;
}

.nav-link i {
  width: 1.25rem;
  margin-right: 10px;
}

.logout {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
</style>
