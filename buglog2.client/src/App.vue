<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view :key="$route.fullPath" />
  </main>
  <footer>
    <div class="bg-info text-dark text-center p-4">
      mAde bY GEo
    </div>
  </footer>
  <CreateBugModal />
  <CreateNoteModal />
  <EditBugModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
