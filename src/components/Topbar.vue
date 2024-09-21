<template>
  <div class="topnav">
    <a :class="{ active: $currPage.value == 'home' }" @click="$currPage.value = 'home'">Home</a>
    <a :class="{ active: $currPage.value == 'decks' }" @click="$currPage.value = 'decks'">Deck Management</a>
    <a :class="{ active: $currPage.value == 'bacs' }" @click="$currPage.value = 'bacs'">Bacs Magagement</a>
  </div>
</template>

<script setup></script>

<style scoped>
.topnav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #1f1f1f;
  overflow: hidden;
  border-bottom: solid #404040 1px;
}
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
}
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
.topnav a.active {
  background-color: #172641;
  color: white;
  cursor: default;
}
</style>
