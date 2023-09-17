<template>
  <div class="machines-display">
    <div class="machines-item">
      <div class="image-container">
        <img :src="machine.img" alt="Machine Image" />
      </div>
      <div class="machine-details">
        <div class="machine-name">{{ machine.name }}</div>
        <div class="machine-description">
          <div class="feature">
            <span class="label">Max Munkamagasság:</span>
            <span class="value">{{ machine.maxHeight }}</span>
          </div>
          <div class="feature">
            <span class="label">Max Teherbírás:</span>
            <span class="value">{{ machine.maxWeight }}</span>
          </div>
          <div class="feature">
            <span class="label">Talp:</span>
            <span class="value">{{ machine.hasSole ? "Van" : "Nincs" }}</span>
          </div>
          <div class="feature" v-if="machine.hasSole">
            <span class="label">Talpak Száma:</span>
            <span class="value">{{ machine.soleCount }}</span>
          </div>
          <div class="feature">
            <span class="label">Kosár:</span>
            <span class="value">{{ machine.hasBasket ? "Van" : "Nincs" }}</span>
          </div>
          <div class="feature">
            <span class="label">Villa:</span>
            <span class="value">{{ machine.hasFork ? "Van" : "Nincs" }}</span>
          </div>
          <div class="feature">
            <span class="label">Távirányítható:</span>
            <span class="value">{{ machine.isRemote ? "Igen" : "Nem" }}</span>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button>Árajánlat kérése</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { machine } = defineProps(["machine"]);
</script>

<style scoped>
.machines-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.machines-display:hover {
  transform: scale(1.05);
}

.machines-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.image-container {
  width: 100%;
  max-width: 200px;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.machine-details {
  margin-top: 10px;
}

.machine-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.machine-description {
  margin-top: 10px;
}

.feature {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.button-container {
  margin-top: 15px;
  text-align: center;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .machines-display {
    flex-direction: column;
    text-align: center;
  }

  .machine-details {
    margin-top: 15px;
  }

  .image-container {
    max-width: 100%;
    width: auto;
  }
}
</style>
